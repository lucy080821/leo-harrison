# Build a tiny autograd and use PyTorch/TensorFlow

In the Backpropagation lesson you computed gradients **by hand** for one specific network. For networks with hundreds of layers that's impossible. **Deep learning frameworks** (PyTorch, TensorFlow, JAX) do it **automatically** through **automatic differentiation** (autograd). In this lesson you write a tiny autograd engine yourself (in the spirit of Andrej Karpathy's `micrograd`) to understand exactly what happens inside.

## The idea: record the computation graph

Every operation creates a **new node** that remembers:

1. Its **value** (`data`).
2. Its **parent nodes** (the inputs that produced it).
3. **How to push the gradient back** to its parents (`_backward`): the **local** derivative.

```text
 a ─┐
    ├─ (×) ─ ab ─┐
 b ─┘            ├─ (+) ─ d
 c ──────────────┘
```

Then `backward()`:

1. **Topologically sort** the nodes (parents always before children).
2. Set `d.grad = 1`.
3. Walk **backward**, calling each node's `_backward`: it **accumulates** the gradient into its parents.

```python
def __mul__(self, other):
    out = Value(self.data * other.data, (self, other))
    def _backward():
        self.grad  += other.data * out.grad     # d(ab)/da = b
        other.grad += self.data  * out.grad     # d(ab)/db = a
    out._backward = _backward
    return out
```

### Why `+=` (accumulate)?

A node may be **used many times** (e.g. $a$ appears in two branches). The total gradient is the **sum of the contributions** (the multi-path chain rule). Overwriting with `=` would be wrong.

![The computation graph of L = (a·b + c) with node gradients](/lessons/deep-learning/10-autodiff-micrograd-frameworks-fig-en.svg)
*The computation graph of L = (a·b + c) with node gradients*

## Local derivatives to remember

| Operation | Local derivative |
|---|---|
| $a+b$ | $\partial/\partial a=1$, $\partial/\partial b=1$ |
| $a\cdot b$ | $\partial/\partial a=b$, $\partial/\partial b=a$ |
| $\max(0,a)$ (ReLU) | $1$ if $a>0$, otherwise $0$ |
| $\tanh(a)$ | $1-\tanh^2(a)$ |
| $a^n$ | $n\,a^{n-1}$ |
| $e^a$ | $e^a$ |

With these you can build **any neural network** and get gradients automatically.

## A complete neuron

```python
w, x, b = Value(-1.0), Value(2.0), Value(4.0)
y = (w * x + b).relu()          # a ReLU neuron: relu(-2 + 4) = 2
y.backward()
# w.grad = x = 2,  x.grad = w = -1,  b.grad = 1
```

By hand: $y=\text{ReLU}(wx+b)$; since $wx+b=2>0$, $\partial y/\partial w=x=2$, $\partial y/\partial x=w=-1$, $\partial y/\partial b=1$. An exact match.

## PyTorch: the same idea at industrial scale

PyTorch builds a **dynamic** graph (on every forward run) and `loss.backward()` computes all gradients. Everything you implemented in this course is built in:

```python
import torch
import torch.nn as nn

# Data and model
X = torch.randn(300, 2)
y = (X[:, 0] * X[:, 1] > 0).float().unsqueeze(1)

model = nn.Sequential(
    nn.Linear(2, 16), nn.Tanh(),
    nn.Linear(16, 1),            # returns logits
)
loss_fn = nn.BCEWithLogitsLoss()                       # sigmoid + BCE, numerically stable
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(500):
    optimizer.zero_grad()              # clear old gradients (autograd ACCUMULATES!)
    loss = loss_fn(model(X), y)        # forward pass
    loss.backward()                    # automatic backpropagation
    optimizer.step()                   # Adam updates the parameters
```

Compare with what you wrote yourself:

| You wrote | PyTorch |
|---|---|
| `forward()` | `model(X)` |
| `bce(p, y)` | `nn.BCEWithLogitsLoss` |
| Hand-coded `backward()` | `loss.backward()` |
| `W -= lr * dW` / Adam | `optimizer.step()` |
| The `Value` class | `torch.Tensor` with `requires_grad=True` |

Remember `optimizer.zero_grad()` each loop (since gradients **accumulate**, exactly like the `+=` you just implemented), and `model.eval()` / `torch.no_grad()` at inference (turns off dropout).

## Keras / TensorFlow: a high-level API

```python
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(16, activation="tanh", input_shape=(2,)),
    keras.layers.Dense(1, activation="sigmoid"),
])
model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])
model.fit(X, y, epochs=50, batch_size=32, validation_split=0.2)
```

`fit` bundles the training loop, batching and validation monitoring.

## Which framework?

| | PyTorch | TensorFlow/Keras | JAX |
|---|---|---|---|
| Style | Natural Python, easy to debug | High-level API, strong deployment ecosystem | Pure functions, function transforms (`grad`, `jit`) |
| Suited to | **Research**, most new LLMs | Products, mobile/web (TF Lite, TF.js) | High-performance computing research |

To run the PyTorch/Keras examples use your own machine or **Google Colab** (free, with GPUs).

## GPUs and computation

Matrix multiplication runs extremely fast on **GPUs**. Move the model and data to the GPU: `model.to("cuda")`, `X = X.to("cuda")`. At scale people use **mixed precision** (float16/bfloat16) and **distributed training**.

## Where to go next

- Do exercises with **PyTorch** on Colab: MNIST, CIFAR-10.
- **Transfer learning**: fine-tune a pretrained model (ResNet, BERT) on your data.
- Hugging Face `transformers`: use and fine-tune language models.
- The next course on this path: **Modern AI** (NLP, embeddings, LLMs, RAG, agents, reinforcement learning).

## Congratulations!

You have **built by hand** neurons, MLPs, backpropagation, optimizers, dropout, convolution, RNNs, attention and autograd. When you use PyTorch you know **exactly** what each line does: a big advantage over merely calling APIs.

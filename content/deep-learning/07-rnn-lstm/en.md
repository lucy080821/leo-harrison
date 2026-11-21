# Recurrent networks (RNN) and LSTM

Much data is **sequential**: text (a sequence of words), audio, time series, DNA. Characteristics: **order matters** and **length varies**. MLPs and CNNs have no "memory" of earlier steps. **RNNs** (Recurrent Neural Networks) do.

## The RNN: a network with a loop

At each time step $t$, an RNN takes the input $\mathbf x_t$ **and the previous hidden state** $\mathbf h_{t-1}$ (memory), and produces a new hidden state:

$$
\mathbf h_t=\tanh\big(\mathbf x_tW_x+\mathbf h_{t-1}W_h+\mathbf b\big)
$$

```text
   x1        x2        x3
   ↓         ↓         ↓
 [ RNN ]─h1→[ RNN ]─h2→[ RNN ]─h3→ ...
```

The **same weights** $(W_x,W_h,\mathbf b)$ are used at **every** step (weight sharing across time), so it handles sequences of **any length**.

```python
h = np.zeros(hidden)
for x_t in seq:
    h = np.tanh(x_t @ Wx + h @ Wh + b)
```

You can take an **output at each step** (tagging every word) or only the **last step** $\mathbf h_T$ (classifying the whole sentence).

## Training: BPTT

Unroll the network over time into a **very deep** network (one layer per step, same weights) and backpropagate: **Backpropagation Through Time (BPTT)**. The gradient of $W_h$ is the **sum of contributions from every step**.

## Vanishing and exploding gradients

The gradient from step $T$ back to step 1 passes through $T$ multiplications by $W_h$ and the tanh derivative:

$$
\frac{\partial\mathbf h_T}{\partial\mathbf h_1}=\prod_{t=2}^{T}\frac{\partial\mathbf h_t}{\partial\mathbf h_{t-1}}\;\sim\;w^{\,T}
$$

| Factor $w$ | After $T=20$ steps | Consequence |
|---|---|---|
| $0.5$ | $9.5\times10^{-7}$ | **Vanishes**: the RNN **forgets** distant information |
| $1.0$ | $1$ | Stable (rarely maintained) |
| $1.5$ | $3.3\times10^{3}$ | **Explodes**: unstable training |

Explosion is handled by **gradient clipping**. **Vanishing** is the core problem: RNNs usually **can't learn long-range dependencies** (e.g. a subject at the start of a long sentence determining a verb at the end).

## LSTM: gated memory

**LSTM** (Long Short-Term Memory, 1997) adds a **cell state** $\mathbf c_t$ running like a "highway" through the sequence and **three gates** (values 0-1) controlling information flow:

$$
\begin{aligned}
\mathbf f_t&=\sigma(W_f[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_f) &&\text{forget gate}\\
\mathbf i_t&=\sigma(W_i[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_i) &&\text{input gate}\\
\tilde{\mathbf c}_t&=\tanh(W_c[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_c) &&\text{candidate cell}\\
\mathbf c_t&=\mathbf f_t\odot\mathbf c_{t-1}+\mathbf i_t\odot\tilde{\mathbf c}_t &&\text{cell update}\\
\mathbf o_t&=\sigma(W_o[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_o) &&\text{output gate}\\
\mathbf h_t&=\mathbf o_t\odot\tanh(\mathbf c_t)
\end{aligned}
$$

- The **forget gate** decides whether to keep or erase the old cell.
- The **input gate** decides which new information to write.
- The **output gate** decides what to expose.

The key: the cell updates by **addition** $\mathbf f\odot\mathbf c_{t-1}+\dots$ instead of repeated multiplication through tanh, so gradients **flow much farther** without vanishing. The **GRU** is a leaner version (2 gates).

```python
# PyTorch (run outside the browser)
import torch.nn as nn
lstm = nn.LSTM(input_size=128, hidden_size=256, num_layers=2, batch_first=True)
out, (h, c) = lstm(x)          # x: (batch, time, 128)
```

## Bidirectional RNNs and seq2seq

- **Bi-RNN**: runs forward and backward so each position sees both **past and future context**.
- **Seq2seq** (encoder-decoder): machine translation, summarization. The encoder compresses the whole sentence into one vector and the decoder generates the target sentence.

## Limitations and the replacement

- **Sequential**: step $t$ must wait for step $t-1$, **can't be parallelized** on GPUs ⇒ slow.
- Still struggles with **very long** dependencies.
- The bottleneck of "compressing a whole sentence into one vector".

The **attention mechanism** (next lesson) and the **Transformer** solve these problems together, and have replaced RNNs/LSTMs in most language applications. LSTM/GRU remain in use for small sequence data, embedded devices and time series.

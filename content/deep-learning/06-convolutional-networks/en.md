# Convolutional neural networks (CNN)

A 224×224 color image has **150,528 pixels**. A dense layer with 1000 neurons would need **150 million weights**: far too big and it **ignores the image's spatial structure**. A **CNN** (Convolutional Neural Network) exploits two observations:

1. **Locality**: useful features (edges, corners) need only a **small region**.
2. **Translation invariance**: an edge in the top or bottom corner is still an edge ⇒ **reuse the same detector** across the whole image.

## The convolution operation

A small **kernel** (filter) (e.g. 3×3) **slides** over the image; at each position it computes the **sum of element-wise products** between the image patch and the kernel:

$$
\text{out}[i,j]=\sum_{u=0}^{k_h-1}\sum_{v=0}^{k_w-1}\text{image}[i+u,\,j+v]\cdot K[u,v]
$$

(Technically this is **cross-correlation**; deep learning still calls it "convolution".)

```python
out[i, j] = np.sum(image[i:i + kh, j:j + kw] * k)
```

The kernel $\begin{pmatrix}1&0&-1\\1&0&-1\\1&0&-1\end{pmatrix}$ responds strongly to **vertical edges** (bright on the left, dark on the right). A CNN **learns the kernels** instead of us designing them by hand.

### Output size

Image $H\times W$, kernel $k$, **padding** $p$, **stride** $s$:

$$
H_{out}=\left\lfloor\frac{H+2p-k}{s}\right\rfloor+1
$$

- **Stride**: the sliding step (stride 2 halves the size).
- **Padding**: a border of zeros around the image. `same` keeps the size; `valid` (no padding) shrinks it.

## Conv layers and channels

- The input has **several channels** (an RGB image has 3).
- Each layer has **many kernels** (e.g. 32): each produces a **feature map**.
- Parameters of one layer: $k_h\cdot k_w\cdot C_{in}\cdot C_{out}+C_{out}$. With 3×3, 3→32 channels: $3\cdot3\cdot3\cdot32+32=896$ parameters, **independent of the image size**.

Compare: a dense layer for a 224×224 image needs tens of millions; a conv layer only a few hundred. That's the power of **weight sharing**.

## Pooling: downsampling

**Max pooling** 2×2 keeps the **maximum** of each block, halves the size, adds **invariance to small shifts** and cuts computation:

```python
x.reshape(H // 2, 2, W // 2, 2).max(axis=(1, 3))
```

**Average pooling** takes the mean. **Global average pooling** reduces each feature map to one number, replacing a large dense layer at the end.

## A typical CNN architecture

```text
 Image ─▶ [Conv → ReLU → Pool] × n ─▶ Flatten ─▶ Dense ─▶ Softmax
          └── feature extraction ──┘   └── classification ──┘
```

Early layers learn **edges, corners**; middle layers learn **textures, parts**; deep layers learn **objects**. This is the **feature hierarchy** you see in visualizations.

## Famous architectures

| Network | Contribution |
|---|---|
| **LeNet** (1998) | The first CNN recognizing digits |
| **AlexNet** (2012) | Began the deep-learning revolution (GPU, ReLU, dropout) |
| **VGG** | Stacks many small 3×3 kernels |
| **ResNet** | **Residual connections** $y=F(x)+x$ enable training hundreds of layers |
| **EfficientNet** | Balances depth/width/resolution |

The **skip connection** fixes vanishing gradients by letting gradients flow straight through the $+x$ addition.

## Sample PyTorch code (to run outside the browser)

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Conv2d(1, 16, kernel_size=3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(16, 32, kernel_size=3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(),
    nn.Linear(32 * 7 * 7, 10),          # 28x28 image -> 10 classes
)
```

## Beyond images

- **Object detection** (YOLO), **segmentation** (U-Net), **face recognition**.
- **Audio/sequences**: 1-D convolutions.
- Today **Vision Transformers (ViT)** compete with CNNs, but the ideas of locality and weight sharing remain very important.

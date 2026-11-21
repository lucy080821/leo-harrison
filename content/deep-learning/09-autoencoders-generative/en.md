# Autoencoders and generative models (GAN, VAE, diffusion)

Since the start of the course, neural networks have **predicted labels** from inputs. This lesson covers two other ideas: **learning compressed representations without labels** (autoencoders) and **generating new data** (generative models).

## Autoencoders

A network trained to **reconstruct its own input** through a narrow **bottleneck**:

```text
 x ──▶ [ Encoder ] ──▶ z (code, few dims) ──▶ [ Decoder ] ──▶ x̂ ≈ x
```

Loss: $L=\|\mathbf x-\hat{\mathbf x}\|^2$. Since $\mathbf z$ has **fewer dimensions** than $\mathbf x$, the network must **compress**, keeping the most important factors. $\mathbf z$ is the **latent representation**.

### Relation to PCA

A **linear** autoencoder (no activations) with MSE yields exactly the **PCA subspace**: encoding $=$ projecting onto the first $k$ singular vectors, decoding $=$ the inverse projection:

```python
code = Xc @ Vt[:k].T
X_hat = code @ Vt[:k] + mean
```

A **non-linear** autoencoder (with activations) is stronger: it can compress curved structure PCA misses.

### Applications

| Application | How |
|---|---|
| **Dimension reduction / visualization** | Use the code $\mathbf z$ |
| **Denoising** (denoising AE) | Feed a noisy image, require reconstructing the clean one |
| **Anomaly detection** | Unusual samples have a **large reconstruction error** |
| **Pretraining** | The representation is reused for other tasks |

## Generative models

Goal: learn the data distribution $p(\mathbf x)$ to **generate new samples** that look real (images, text, audio). Three main families:

### 1. VAE (Variational Autoencoder)

A **probabilistic** autoencoder: the encoder outputs a **distribution** (mean and std) for $\mathbf z$ instead of a point, and a **KL** term pushes it toward $N(0,I)$:

$$
L = \underbrace{\|\mathbf x-\hat{\mathbf x}\|^2}_{\text{reconstruction}} + \underbrace{D_{KL}\big(q(\mathbf z\mid\mathbf x)\,\|\,N(0,I)\big)}_{\text{keeps the latent space smooth}}
$$

Generate: sample $\mathbf z\sim N(0,I)$ then decode. Images are a bit blurry but training is stable.

### 2. GAN (Generative Adversarial Network)

Two **adversarial** networks:

- The **generator** $G$: makes fake images from noise $\mathbf z$.
- The **discriminator** $D$: tells **real** from **fake** images.

$$
\min_G\max_D\ \mathbb{E}[\log D(\mathbf x)]+\mathbb{E}[\log(1-D(G(\mathbf z)))]
$$

With $D(\text{real})=0.9$ and $D(\text{fake})=0.2$:

$$
L_D=-\big[\ln 0.9+\ln(1-0.2)\big]\approx0.3285,\qquad
L_G=-\ln(0.2)\approx1.6094\ \text{(non-saturating form)}
$$

$D$ tries to **lower** $L_D$ (classify correctly), $G$ tries to **lower** $L_G$ (fool $D$). The two **co-evolve**. Images are sharp but training is **hard and unstable** (mode collapse: producing only a few kinds of samples).

### 3. Diffusion models

The foundation of Stable Diffusion, DALL·E, Midjourney.

- **Forward process:** gradually **add Gaussian noise** to an image over $T$ steps until only pure noise remains.
- **Reverse process:** train a network (often a **U-Net** or Transformer) to **predict and remove the noise** step by step. Generating an image = start from pure noise and **denoise gradually** into an image.

```text
 real image ──add noise──▶ ... ──▶ pure noise
 new image  ◀──denoise── ... ◀── random noise
```

High quality and stable training; can be **conditioned on text** (text-to-image). The downside is that sampling needs **many steps** (slower than GANs).

## Language models are generative too

An LLM is an **autoregressive generative model**: it learns $p(\text{word}_t\mid\text{previous words})$ and generates one word at a time. (You'll meet this in the Modern AI course.)

## Quick comparison

| Family | Sample quality | Stability | Sampling speed |
|---|---|---|---|
| **VAE** | Medium (blurry) | **Stable** | Fast |
| **GAN** | Very good (sharp) | **Hard to train** | **Very fast** |
| **Diffusion** | **Best** | Stable | Slow (many steps) |
| **Autoregressive** (LLM) | Very good (text) | Stable | Sequential, token by token |

## Sample PyTorch code (run outside the browser)

```python
import torch.nn as nn
class AutoEncoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 16))
        self.dec = nn.Sequential(nn.Linear(16, 128), nn.ReLU(), nn.Linear(128, 784), nn.Sigmoid())
    def forward(self, x):
        return self.dec(self.enc(x))
# loss = nn.MSELoss()(model(x), x)
```

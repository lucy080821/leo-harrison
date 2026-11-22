# Reinforcement learning: Q-learning

In supervised learning you have the right answer for every sample. **Reinforcement Learning** (RL) is different: an **agent** learns by **trial and error** from **rewards**, like training a pet. Nobody says "the correct action is X"; you only learn "was the outcome good or bad" **after** acting.

Applications: playing Go (AlphaGo), robotics, control, recommendation, and **RLHF** for aligning LLMs (the LLM lesson).

## The problem framework

```text
        action a_t
   ┌───────────────────────▶ ┌──────────────┐
   │                         │ Environment  │
 [Agent]  ◀────────────────  └──────────────┘
   state s_{t+1}, reward r_{t+1}
```

| Concept | Meaning |
|---|---|
| **State** $s$ | The current situation |
| **Action** $a$ | The agent's choice |
| **Reward** $r$ | A numeric signal after an action |
| **Policy** $\pi(s)$ | The rule choosing an action in each state |
| **Episode** | One run from start to end |

Modelled as an **MDP** (Markov Decision Process): the next state and reward depend only on the current $(s,a)$.

![The agent–environment loop and the Q-table](/lessons/modern-ai/07-reinforcement-learning-fig-en.svg)
*The agent–environment loop and the Q-table*

## Discounted return

The goal: maximize the **total future reward**, but **earlier rewards are worth more** than later ones, so we **discount** with $\gamma\in[0,1)$:

$$
G_t=r_{t}+\gamma r_{t+1}+\gamma^2r_{t+2}+\dots=\sum_{k=0}^{\infty}\gamma^kr_{t+k}
$$

With $r=[1,1,1]$, $\gamma=0.9$: $G=1+0.9+0.81=2.71$. $\gamma$ near 1: the agent is **far-sighted**; near 0: **short-sighted**.

## The action-value function $Q(s,a)$

$Q(s,a)$ is the **expected return** if you take action $a$ in state $s$ and then follow the optimal policy. Knowing $Q^*$, the optimal policy is simply to **pick the action with the largest $Q$**:

$$
\pi^*(s)=\arg\max_aQ^*(s,a)
$$

### The Bellman equation

$$
Q^*(s,a)=\mathbb{E}\Big[r+\gamma\max_{a'}Q^*(s',a')\Big]
$$

"Value now = immediate reward + the (discounted) value of the best next state."

## Q-learning

An algorithm that learns $Q$ from **experience**, without knowing the environment's rules. At each step $(s,a,r,s')$:

$$
Q(s,a)\leftarrow Q(s,a)+\alpha\Big[\underbrace{r+\gamma\max_{a'}Q(s',a')}_{\text{target (TD target)}}-Q(s,a)\Big]
$$

- $\alpha$: the learning rate.
- The bracket $[\dots]$: the **TD error**; it pulls $Q$ toward a better estimate.

```python
Q[s, a] += alpha * (r + gamma * Q[s2].max() - Q[s, a])
```

The reward at the goal **propagates backward** to earlier states: after a few episodes, $Q$ for "go right" is higher than "go left" in every state.

## Exploration vs exploitation

If you always pick the best-known action (**exploit**) you may **miss** better options you haven't tried. If you try randomly (**explore**) you don't use what you've learned. **$\varepsilon$-greedy**:

- With probability $\varepsilon$: a **random** action.
- Otherwise: the **$\arg\max Q$** action.

```python
a = int(rng.integers(2)) if rng.random() < epsilon else int(Q[s].argmax())
```

Usually $\varepsilon$ is decayed over time.

## The exercise: a 5-cell corridor

The agent starts in cell 0 and the goal is cell 4 (reward +1). After learning, the greedy policy is **all "R"** (go right), as expected.

## From a Q-table to deep RL

A $Q$-table only works with a **small number of states**. With game images or robots, states are practically infinite. The **Deep Q-Network (DQN)** replaces the table with a **neural network** $Q_\theta(s,a)$ (DeepMind playing Atari, 2013). Stabilizing tricks: the **replay buffer**, the **target network**.

## Families of RL algorithms

| Family | Idea | Example |
|---|---|---|
| **Value-based** | Learn $Q$, the policy is implicit | Q-learning, DQN |
| **Policy-based** | Learn $\pi_\theta$ directly by gradients | REINFORCE |
| **Actor-Critic** | Combine both | A2C, **PPO** (very popular) |
| **Model-based** | Learn a model of the environment to plan | AlphaZero, MuZero |

**PPO** is the algorithm behind **RLHF** for many LLMs.

## The difficulties of RL

- **Needs a huge amount of experience** (poor sample efficiency).
- **Reward design is hard**: the agent "games" the score in unintended ways (**reward hacking**).
- **Unstable**, sensitive to hyperparameters.
- **Sparse signals** (reward only at the end).
- **Safe trial and error** in the real world.

So RL is usually trained in **simulation**.

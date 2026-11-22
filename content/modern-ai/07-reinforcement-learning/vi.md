# Học tăng cường: Q-learning

Ở học có giám sát, bạn có sẵn đáp án đúng cho từng mẫu. **Học tăng cường** (Reinforcement Learning, RL) khác: một **tác tử** học **bằng thử và sai** từ **phần thưởng**, giống huấn luyện thú cưng. Không ai bảo "hành động đúng là gì", chỉ cho biết "kết quả tốt hay xấu" **sau** hành động.

Ứng dụng: chơi cờ vây (AlphaGo), robot, điều khiển, hệ gợi ý, và **RLHF** để căn chỉnh LLM (bài LLM).

## Khung bài toán

```text
        hành động a_t
   ┌───────────────────────▶ ┌──────────────┐
   │                         │  Môi trường  │
 [Tác tử]  ◀───────────────  └──────────────┘
   trạng thái s_{t+1}, phần thưởng r_{t+1}
```

| Khái niệm | Ý nghĩa |
|---|---|
| **Trạng thái** $s$ | Tình huống hiện tại |
| **Hành động** $a$ | Lựa chọn của tác tử |
| **Phần thưởng** $r$ | Tín hiệu số sau hành động |
| **Chính sách** $\pi(s)$ | Quy tắc chọn hành động ở mỗi trạng thái |
| **Tập** (episode) | Một lượt chơi từ đầu đến khi kết thúc |

Mô hình hoá bằng **MDP** (Markov Decision Process): trạng thái tiếp theo và phần thưởng chỉ phụ thuộc $(s,a)$ hiện tại.

![Vòng agent – môi trường và bảng Q](/lessons/modern-ai/07-reinforcement-learning-fig-vi.svg)
*Vòng agent – môi trường và bảng Q*

## Lợi tức chiết khấu

Mục tiêu: tối đa hoá **tổng phần thưởng tương lai**, nhưng phần thưởng **sớm quý hơn** phần thưởng muộn, nên **chiết khấu** bằng $\gamma\in[0,1)$:

$$
G_t=r_{t}+\gamma r_{t+1}+\gamma^2r_{t+2}+\dots=\sum_{k=0}^{\infty}\gamma^kr_{t+k}
$$

Với $r=[1,1,1]$, $\gamma=0.9$: $G=1+0.9+0.81=2.71$. $\gamma$ gần 1: tác tử **nhìn xa**; gần 0: **thiển cận**.

## Hàm giá trị hành động $Q(s,a)$

$Q(s,a)$ là **lợi tức kỳ vọng** nếu làm hành động $a$ ở trạng thái $s$ rồi theo chính sách tối ưu. Biết $Q^*$ thì chính sách tối ưu đơn giản là **chọn hành động có $Q$ lớn nhất**:

$$
\pi^*(s)=\arg\max_aQ^*(s,a)
$$

### Phương trình Bellman

$$
Q^*(s,a)=\mathbb{E}\Big[r+\gamma\max_{a'}Q^*(s',a')\Big]
$$

"Giá trị bây giờ = phần thưởng ngay + giá trị (chiết khấu) của trạng thái tốt nhất tiếp theo."

## Q-learning

Thuật toán học $Q$ từ **trải nghiệm**, không cần biết luật môi trường. Mỗi bước $(s,a,r,s')$:

$$
Q(s,a)\leftarrow Q(s,a)+\alpha\Big[\underbrace{r+\gamma\max_{a'}Q(s',a')}_{\text{mục tiêu (TD target)}}-Q(s,a)\Big]
$$

- $\alpha$: tốc độ học.
- Hiệu $[\dots]$: **sai số TD**; kéo $Q$ về phía ước lượng tốt hơn.

```python
Q[s, a] += alpha * (r + gamma * Q[s2].max() - Q[s, a])
```

Phần thưởng ở đích lan truyền **ngược dần** về các trạng thái trước: sau vài lượt, $Q$ của hành động "đi phải" ở mọi trạng thái đều cao hơn "đi trái".

## Khám phá và khai thác

Nếu chỉ luôn chọn hành động tốt nhất đang biết (**khai thác**), có thể **bỏ lỡ** lựa chọn tốt hơn chưa thử. Nếu cứ thử bừa (**khám phá**) thì không tận dụng được. **$\varepsilon$-greedy**:

- Với xác suất $\varepsilon$: hành động **ngẫu nhiên**.
- Còn lại: hành động **$\arg\max Q$**.

```python
a = int(rng.integers(2)) if rng.random() < epsilon else int(Q[s].argmax())
```

Thường giảm $\varepsilon$ dần theo thời gian.

## Bài thực hành: hành lang 5 ô

Tác tử bắt đầu ở ô 0, đích ở ô 4 (thưởng +1). Sau khi học, chính sách tham lam là **toàn "R"** (đi phải), đúng như mong đợi.

## Từ bảng Q đến deep RL

Bảng $Q$ chỉ dùng được khi **số trạng thái nhỏ**. Với ảnh game hay robot, trạng thái gần như vô hạn. **Deep Q-Network (DQN)** thay bảng bằng **mạng nơ-ron** $Q_\theta(s,a)$ (DeepMind chơi Atari 2013). Các kỹ thuật ổn định: **bộ đệm trải nghiệm** (replay buffer), **mạng đích** (target network).

## Các họ thuật toán RL

| Họ | Ý tưởng | Ví dụ |
|---|---|---|
| **Dựa trên giá trị** | Học $Q$, chính sách gián tiếp | Q-learning, DQN |
| **Dựa trên chính sách** | Học thẳng $\pi_\theta$ bằng gradient | REINFORCE |
| **Actor-Critic** | Kết hợp cả hai | A2C, **PPO** (rất phổ biến) |
| **Dựa trên mô hình** | Học mô hình môi trường để lập kế hoạch | AlphaZero, MuZero |

**PPO** là thuật toán đứng sau **RLHF** cho nhiều LLM.

## Khó khăn của RL

- **Cần rất nhiều trải nghiệm** (kém hiệu quả mẫu).
- **Thiết kế phần thưởng khó**: tác tử "lách luật" tối đa hoá điểm theo cách ngoài ý muốn (**reward hacking**).
- **Không ổn định**, nhạy với siêu tham số.
- **Tín hiệu thưa** (phần thưởng chỉ ở cuối).
- **An toàn khi thử sai** trong thế giới thật.

Vì vậy RL thường huấn luyện trong **mô phỏng**.

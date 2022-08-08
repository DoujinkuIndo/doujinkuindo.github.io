---
layout: post
title: Quaternion
---

- [ ] [사원수와 회전](https://ghebook.blogspot.com/2020/09/quaternion-and-rotation.html?m=1)
- [ ] [A Tutorial on Euler Angles and Quaternions](https://www.weizmann.ac.il/sci-tea/benari/sites/sci-tea.benari/files/uploads/softwareAndLearningMaterials/quaternion-tutorial-2-0-1.pdf)

# 사원수 (Quaternion : 쿼터니언)
3차원 그래픽에서 회전을 표현할 때, 행렬 대신 사용하는 수학적 개념으로 4개의 값으로 이루어진 복소수(Complex Number)체계입니다.

$$ q = <w, x, y, z> = w + xi + yj + zk $$

* 실수부와 허수부의 합으로 구성된 수입니다.
* 사원수는 행렬에 비해 연산 속도가 빠르고, 차지하는 메모리의 양도 적으며, 결과의 질에 있어 오류가 날 확률이 적습니다.
* 3개의 축에 대한 회전 연산을 동시에 적용하는 경우에 행렬을 사용하면 한 축이 소실되는 짐벌락 현상이 발생할 수 있습니다. 사원수를 사용하면 이 현상을 막을 수 있습니다. (완벽하게 막지는 못합니다.)

[10 mins GameDev tips - Quaternions](https://www.youtube.com/watch?v=1yoFjjJRnLY)

쿼터니언의 각 값이 나타내는 현상입니다.

<center><div markdown="1">

![Quaternion SimpleUnderstand Image](/images/Quaternion_SimpleUnderstandImage.png)

</div></center>

<details><summary>사원수의 정의</summary>
<div markdown="1">

사원수는 4차원 복소수 공간(Complex Space)의 벡터로서 다음과 같이 나타냅니다.

$$ q = <w, x, y, z> = w + xi + yj + zk $$

사원수를 $$ q = s + v $$형태로 쓰기도 하는데, 여기서 s는 q의 w성분에 해당하는 스칼라(Scalar)값이고, v는 q의 x, y, z 성분에 해당하는 벡터(Vector) 부분입니다.

</div></details>

<details><summary>사원수의 특징</summary>
<div markdown="1">

사원수의 곱은 일반적인 분배법칙을 따르며 허수 성분인 i, j, k는 다음과 같은 특징을 갖습니다.

$$ i^2 = j^2 = k^2 = -1 $$    
$$ ij = -ij = k $$     
$$ jk = -kj = i $$    
$$ ki = -ik = j $$    

[Sample Rotations](https://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/examples/index.htm)

추가적으로 각 원소가 어떤 의미를 가지는지 볼 수 있습니다.

</div></details>

<details><summary>언리얼 블루프린트에서 쿼터니언 구하기</summary>
<div markdown="1">

[Quaternion in blueprint](https://forums.unrealengine.com/t/quaternion-in-blueprint/5793/33)

에서, 쿼터니언을 기본적으로 제공해 주지 않는 이유를 설명합니다... 중요한건 블루프린트에서 쿼터니언을 사용하고자 한다면, Rotation을 Vector로 변환 후 EulerVector로 부터 Quaterion을 만들 수 있다는 점 입니다.

![Quaternion from eluer](/images/Quaternion_MakeQuatFromEuler.png)

</div></details>

<!-- <details><summary>축과 각도로 부터 쿼터니언 구하기</summary>
<div mardown="1">

튜토리얼 공부하고 내용 채워넣어야 함.

</div></details> -->

<details><summary>축과 각도로 부터 쿼터니언 구하기</summary>
<div markdown="1">

축 A에 대한 각도 Θ 만큼의 회전을 사원수로 나타내면 다음과 같습니다.

```
q = cos(Θ/2) + A sin(Θ/2)
```

사원수를 회전행렬로 변환하면, 아래와 같습니다.

```
      | 1-2y^2-2z^2     2xy-2wz         2xz+2wy     0 |
R_q = | 2xy+2wz         1-2x^2-2z^2     2yz-2wx     0 |
      | 2xz-2wy         2yz+2wx         1-2x^2y^2   0 |
      | 0               0               0           1 |
```

[Maths - AxisAngle to Quaternion](https://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm)

축과 각도로 부터 쿼터니언은 다음과 같이 구할 수 있습니다.

$$ qx = ax * sin(angle/2) $$    
$$ qy = ay * sin(angle/2) $$     
$$ qz = az * sin(angle/2) $$    
$$ qw = cos(angle/2) $$    

* 축은 길이가 1입니다. 따라서 길이를 구할 때, qx, qy, qz 성분이 $$ sin(angle/2)^2 + cos(angle/2)^2 = 1 $$가 되어 정규화된 쿼터니언이 나오게 됩니다.
* Angle이라고 표시되었지만, 실제 계산에서는 대부분 Radian을 사용합니다. Radian/2로 대신할 수 있습니다.

</div></details>

<details><summary>사원수의 곱셉</summary>
<div markdown="1">

기존에 있는 회전에 새로운 회전을 더하고 싶다면 다음의 순서를 따라야 합니다. (새로운 회전)*(기존에 있는 회전)로 적용이 됩니다.

두 사원수가 다음과 같으면    
$$ q1 = w1 + x1i + y1j + z1k = s1 + v1 $$    
$$ q2 = w2 + x2i + y2j + z2k = s2 + v2 $$     
    
사원수의 곱셉은 다음과 같습니다.    
$$ q1q2 = (w1w2 - x1x2 - y1y2 - z1z2)           $$     
$$      + (w1x2 + x1w2 + y1z2 - z1yy)i          $$           
$$      + (w1y2 - x1z2 + y1w2 + z1x2)j          $$     
$$      + (w1z2 + x1y2 - y1x2 + z1w2)k          $$     
$$      = s1s2 - v1·v2 + s1v2 + s2V1 + v1×v2    $$     

* 사원수는 곱셉의 교환법칙이 성립하지 않습니다.
* 회전 행렬에서 새로운 회전이 앞에가야 하는 이유를 설명합니다.

</div></details>

<details><summary>사원수의 켤레(Conjugate)</summary>
<div markdown="1">

사원수 q = s + v의 켤레사원수는 q\hat 라고 표기합니다. q\hat = s - v입니다. 사원수 q와 그의 켤레 q\hat의 곱은 q자신의 내적과 동일합니다. q 자신의 내적 q·q는 q의 크기의 제곱입니다. 즉,

```
q q\hat = q \hat q = q·q = ||q||^2 = q^2
```

</div></details>

<details><summary>사원수의 역수</summary>
<div markdown="1">

0이 아닌 사원수 q의 역수 q-1는 다음과 같이 주어집니다.

```
q-1 = q \hat / q^2
```

그리고 다음과 같은 특징을 같습니다.
```
q q\hat = q \hat q = 1
```

</div></details>

<details><summary>사원수의 크기</summary>
<div markdown="1">

```
||q|| = Norm(q) = sqrt(w^2 + x^2 + y^2 + z^2)
```

</div></details>

<details><summary>사원수의 단위</summary>
<div markdown="1">

```
w^2 + x^2 + y^2 + z^2 = 1
```

</div></details>

<details><summary>사원수의 정규화 (단위 쿼터니언)</summary>
<div markdown="1">

```
q = q / ||q|| = q / sqrt(w^2 + x^2 + y^2 + z^2)
```

</div></details>

<details><summary>사원수의 보간(interpolation)</summary>
<div markdown="1">

물체의 애니메이션을 수행할 때, 보간을 통해 계산된 키프레임 사이의 중간 방향을 생성합니다.

가장 간단한 보간은 선형보간(linear interpolation)으로 두 개의 값을 점으로 생각하고 두 개의 점을 이어주는 직선의 방정식으로부터 값을 얻어내는 방법입니다.

두 사원수 q1, q2에 대해, 선형 보간된 사원수 q(t)는 다음과 같습니다. 보간 후에는 정규화를 해줘야 합니다.

```
q`(t) = (1-t)q_1 + tq^2
q(t) = q`(t) / ||q`(t)||
```

* q1 -> q2를 잇는 선을 따라 보간합니다.

이러한 선형 보간은 간단하고, 효과적이나 호를 일정한 비율로 추적하지 않는다는 문제가 있습니다. 이에 따라 구면 선형보간(sphericcal linear interpolation : slerp)가 나타났습니다.

```
q(t) = sinΘ (1-t) / sinΘ * q1 + sinΘ t / sinΘs * q^2
```

* 보간이란 처음과 끝의 값을 가지고 중간에 잇는 값을 계산해 내는 것입니다.

</div></details>

주요 참고자료 : [쿼터니언 이해하기](http://chanhaeng.blogspot.com/2018/07/blog-post.html)
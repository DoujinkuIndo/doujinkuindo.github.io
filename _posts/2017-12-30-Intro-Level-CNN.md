---
layout: post
title: Day 3-6 Introduction to CNN
permalink: /30ddlf/intro-level-CNN
comment: true
---
#### Project Content &rarr;  *[30 Days Of Deep Learning Fundamentals](/blog/30-days-of-deep-learning-fundamentals/)*
#### Github repo for today &rarr; *[CIFAR10 with Alexnet and VGG](https://github.com/6ixNugget/CIFAR10-with-Alexnet-and-VGG)*
## Day 3

#### Focus of the day: Set up base code for cifar10
[The CIFAR-10 and CIFAR-100 dataset](https://www.cs.toronto.edu/~kriz/cifar.html) are labeled subsets of the [Tiny Images Dataset](http://groups.csail.mit.edu/vision/TinyImages/). They were collected by three UofT fellows Alex Krizhevsky, Vinod Nair, and Geoffrey Hinton. 

#### Tasks done
1. Set up base training code for CIFAR10
2. Study the [tensorflow example](https://www.tensorflow.org/tutorials/deep_cnn) of building a CNN and training it on multiple GPU cards.
3. Study [the Alexnet paper](https://www.nvidia.cn/content/tesla/pdf/machine-learning/imagenet-classification-with-deep-convolutional-nn.pdf)

#### Q & A: 
1. What is parallelism in Machine Learning? How does training on multiple GPUs work?

    After digging a bit I found this is too broad a question. There is an entire department of science and engineering behind the parallelism used in Machine Learning and related fields. Here's [an article](https://www.kdnuggets.com/2016/11/parallelism-machine-learning-gpu-cuda-threading.html) from KDNugget touching briefly on this topic. It is worth noting that some commonly used libraries, like CUDA and OpenCL, are examples of parallel computing platforms.

2. What role does input normalization play?

    Normalization is useful to prevent neurons from saturating when inputs may have varying scales, and to aid generalization. Training a deep neural network is often complicated by the fact that distributions of each layer's input or each datapoint changes during training. This forces to use smaller learning rates and careful parameter initialization and consequently slows down the learning process. Oftentimes, by fixing the distribution of inputs to a network would have positive consequences such as accelerating learning and better generalization results.

3. What is saturating nonlinearity?

    Here's a nice post on [What does the term saturating nonlinearities mean?](https://stats.stackexchange.com/questions/174295/what-does-the-term-saturating-nonlinearities-mean)

    You might have heard of ReLU, or rectified linear unit, being a non-saturating non-linear activation function.  
    Examples of other commonly seen saturating (smooth, everywhere differentiable) nonlinearities are sigmoid, tanh and elu.

4. Why does relu not require input normalization?

    To clarify the question, in 3.3 of [the Alexnet paper](https://www.nvidia.cn/content/tesla/pdf/machine-learning/imagenet-classification-with-deep-convolutional-nn.pdf), it says
    > "ReLUs have the desirable property that they do not require input normalization to prevent them from saturating."

    Why is that?  

    Because of the property of non-saturating. Saturating nonlinearity "squashes" the real number range into a smaller subset of it. For example, tanh to [-1, 1] and sigmoid to [0, 1]. The gradient on these saturating functions, when \|x\| increases, tends to zero. This means that for all dimensions of x, except for those with small absolute values, the gradient will flow down and vanish, and the model will train extremely slowly or even stop training in some cases when this happens.

    Non-saturating nonlinearity such as ReLU, is not constrained by this gradient vanishing problem. Unfortunately, Relu has its own problem. It can be fragile during training and can essentially "die" (this is called a dying relu problem). A large gradient flowing through a ReLU neuron could cause the weights to update in such a way that the neuron will never activate on any datapoint again. If this happens, then the gradient flowing through the unit will forever be zero from that point on. 

## Day 4
#### Focus of the day: Build a model similar to Alexnet on cifar10

#### Tasks done
1. Build up an Alexnet like model on cifar10

#### Q&A
1. What does Local Response Normalization do?  

    [original paper by Alex Krizhevsky et al.](http://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)  
    Let me first throw out a few points so you can get a rough idea of what LRN is.  
    * It's a type normalization methods, which are useful to prevent neurons from saturating when inputs may have varying scales, and to aid generalization.  
    * It's inspired by a mechanism found in real-life neurons in human vision system called "lateral inhibition".
    * What lateral inhibition does is that an activated/excited neuron has the ability to reduce the activity level of its neighbor neurons, which creates competitions in the local region to ensure core information is correctly outputed.
    * And that's essentially what LRN does.

    Refer to the original paper for the LRN formula. If you found it too hard to understand, here's a nice and simple [explanation on this formula by yeephycho](yeephycho.github.io/2016/08/03/Normalizations-in-neural-networks/). In this article he also covered other types of normalizations, take a look if you are interested.

2. How does a ReLU die?  

    My first question when I learned the problem of a dying relu is that, how does relu actually work with the left side of gradient = 0? If a data point put the current weights to the left side of relu, isn't that the relu just dies instantly and will never come back?

    The answer to my question is that most optimizers don't just look at a single data point (that's online learning), they consider a batch of inputs. And within that batch of inputs, even if a single data point gives a positive response, the relu is still alive.

    Then we come back to the question of how a relu actually dies? In some extreme cases, especially when we are using a large learning rate, the optimizer could update the weights into an extremely negative territory that no inputs in the dataset could possibly bring a neuron back -- it will always end up being negative when computing the gradient, which in turn gives 0 gradient due to the property of relu. Then the neuron is gone.

    It turns out that sometimes dying relu is not a problem at all. One can easily realize that not all features should contribute to a classifier. Whether you like a movie should have nothing to do with your preference on drinks. Dying relu leads to a good property of increasing sparsity and in turn aid generalization. I'll talk about that later in this post.

3. Is there any universal solution to the dying ReLU problem? If there is, why didn't people start using it yet?

    There is not. At least the controversy hasn't been settled. Here's [a paper](https://arxiv.org/abs/1505.00853) evaluating different modified versions of relus, which are all used to solve the dying relu problem, compared to relu in terms of performance. In practice, most people report they don't see a significant advantage using these modified version over relu. This problem remains open and likely requires more investigations.

## Day 5
#### Focus of the day: Train the Alexnet-like model and build a model similar to VGG on cifar10

#### Tasks done
1. Train the Alexnet like model
2. Build up a VGG like model for cifar10

#### Q&A
1. What's moving averages? How is it used in DL?

    Refer to **Notes of the day** down at bottom of the post.

2. What's momentum used in training?

    Refer to **Notes of the day** down at bottom of the post.

3. What's the connection between consecutive convolutional layers and the filter sizes?

    It's easy to visualize that a stack of two subsequent 3x3 conv layers (without spatial pooling in between) has a pretty similar effect as a 5x5 conv layer.  

    In Alexnet, every convolutional layer is followed by a spatial pooling and it's not hard to see the problem with this method: when we are trying to increase the depth of a network, sub-sampling methods like spatial pooling multiplicatively decrease the size of the feature map. For example, a 32 by 32 image can only afford 5 max-poolings before it becomes a single pixel. One of the solutions to this problem is that instead of using relatively large filter size in one single convolutional layer, we do multiple layers with small filter sizes. VGG is one of the models that follow this configuration.

    In the [original paper of VGG](https://arxiv.org/pdf/1409.1556.pdf), section 2.3, the authors discussed on this topic. In VGG, before each maxlpool layer, there are 2 to 3 convolutional layers in between and each with a relatively small filter size of 3. (In VGG16-C they also have 1x1 conv layers)

    The size of the effective area of a block of convolutional layer is referred as Effective Receptive Field (EFR) in the paper. We can just think of it as the field of view of a camera (the conv block) that scans an area (the inputs, in our case) multiple times. The EFR, or effective field of view, of a single 5x5 conv layer is 5x5. The EFR of a stack of two 3x3 conv layers is 5x5 as well. EFR of a single conv layer of 7x7 filter is 7x7, and a stack of 3 conv layers of filter size 3x3 is also 7x7.

    One of the advantages of this configuration is that, by substituting with multiple conv layers, we can introduce more non-linearities into the system. After each conv layer with small filter size, we can add a non-linear activation function. The end result is that, while we have the same EFR, we have made the decision function more discriminative by inserting more non-linearities. Another advantage discussed in the paper is that this configuration requires significantly fewer parameters compared to single layer structure.


## Day 6

#### Focus of the day: Train the models and play with the hyperparameters

#### Tasks done
1. Train the VGG like model

#### Q&A
1. What is learning rate schedule and how important is it?

    In training deep networks, you can obtain better results by annealing the learning rate over time. While a relatively large initial learning rate is important for optimizers like SGD not to get stuck in a local minimum, a too large LR during the later stage of training will cause the optimizer to bounce around the optimal point and not be able to converge correctly.

    There are several methods we can use to anneal learning rate. One of them is just to simply stop the training and change the LR manually. It requires a fairly good intuition and can be really tricky sometimes. 

    Learning rate schedule is another method, it sets up an algorithm to decay the learning rate during the training. There are three common types:
    
    * Step decay:   Step decay reduces the learning rate by some factor every few steps (oftentimes it's epochs).
    * Exponential decay: Decay the learning rate exponentially according to the number of steps. A implementation from tf.train.exponential_decay:
    > decayed_learning_rate = learning_rate * decay_rate ^ (global_step / decay_steps)
    * 1/t decay: Just as what it says, the number of steps is down there in the denominator. A implementation from tf.train.inverse_time_decay:
    > decayed_learning_rate = learning_rate/(1 + decay_rate * t)

    Another way to adjust the learning rate during training is to use a per-parameter adaptive learning rate methods. Refer to the **Notes of the day** for more.
    
2. In what way does the metrics of sparsity aid learning process?

    Sparsity is a property that describes how sparse a model is. By sparsity, we usually mean the sparsity of connections. An algorithm yields a sparse result when only a small number of parameters that describe the model are non-zero.   
    
    In an analogy to the human brain, although we have an incredibly large number of neurons, each neuron only connects to a small number of peers. When a single neuron is triggered/activated, it has a higher probability to activate its connected peers too. Each unit in a deep learning model should also connect to relatively few peers.

    In most models, we induce the sparsity of connections by having higher sparsity of weights. What this means is that instead of connecting a neuron to fewer peers, we connect the neuron to most of its peers (sometimes make it fully connected), and have most of the weights to be zero. This resembles a similar effect as having a high sparsity in connections as zero weights essentially mean no connections between the neurons. (Unlike sparsity in connections though, we still have to pay the price of computational resources to multiply the inputs and zeros)

    We can use sparsity as a way to regularize learning. Intuitively, a model that has a low sparsity, meaning that it has used a larger number of parameters to approximate the target,  will have a higher risk of overfitting. By regularizing the training with sparsity, we can theoretically reduce the risk of overfitting as well. L1 regularizer is the most commonly used sparsity regularizer.

    As my research goes, I found there are also people suggesting sparsity "has not been paid off" as empirical evidence do not provide solid support to the theory. [Ian Goodfellow's answer on Quora](https://www.quora.com/Where-is-Sparsity-important-in-Deep-Learning/answer/Ian-Goodfellow?srid=td71). So take it with a grain of salt.

3. What's Adam?

    Refer to **Notes of the day** down at bottom of the post.


## Notes of the day

I'll copy and paste the questions that I asked you to refer to this part from above.  
1. What's moving averages? How is it used in DL?
2. What's momentum used in training?
3. What's Adam?

It turns out these questions are all connected. And the answers to them all reside in a topic called "Per-parameter adaptive learning rate methods".

Forgive me as I'll keep you hanging on these questions. As of right now I'm working on experimenting the differences between the methods, and I will write a dedicated post on these questions and the topic of per-parameter learning methods.
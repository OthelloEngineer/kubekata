

# Kubekata
*Kubekata is in very early development and therefore should not be used by end-users for kubernetes on-boarding yet, although feedback is gratefully accepted. Given the lack of a major release, all changes should be considered as breaking.*


![KubeCuddle](https://raw.githubusercontent.com/OthelloEngineer/kubekata/refs/heads/main/frontend/src/lib/icons/kubecuddle.png)

A level-based kubernetes on-boarding guide that provides a mixed top-down and bottom-up approach to learning how to use, debug, and extend kubernetes. This platform is scoped to only include favourable learning objectives for application developers who are responsible for deploying apps for distributed architectures. In short, the goal of kubekata is equipping developers the knowledge and experience necessary for developing distributed application in kubernetes; all the way from deploying an nginx-server to creating their own kubernetes operator that maintains a distributed state of an app. A better description of the learning objectives is described at the [Learning Objectives section](#learning-Objectives).

KubeKata expects that the user is familiar with docker and basic networking in linux, has a local/remote kubernetes cluster that they can access, and IDE that can be used for coding tasks (Not yet added). 

## How to Run

Running kubekata can be done in several ways:
- with Talos (not yet implemented)
- with minikube (partially implemented)
- with an already initialied and accesible cluster

Running kubekata in Talos or minikube are the safest approaches since there will be no side-effects of the RBAC configuration that the default access mode of the k8scontroller.

Two different access modes are available for the k8scontroller:
1. Service account mode where the k8s controller uses the default-view service account to be able to access the kubernetes api. 
This requires running the command:  <br>
`kubectl create clusterrolebinding default-view --clusterrole=view --serviceaccount=default:default` 
2. kubeconfig mode where a kubernetes config file is uploaded through the levels menu in the frontend. 

## Learning Objectives
***WIP!***

The learning objectives of KubeKata are:
- Basic understanding and interaction with kubernetes core components (controller manager, API, scheduler, kubeproxy, etcd)
- Deploying, and exposing apps on kubernetes
- Persisting storage in kubernetes through PV/PVC and basic configuration of storage classes
- Debugging applications in kubernetes through kubectl, tracing, and execing into pods. 
- Configuring apps to support kubernetes
- Configuring, deploying and identifying common use-cases for sidecars and init-containers
- Maintaining distributed state through ordinal names from statefulsets and routing using headless-service
- Implementing livez and readyz endpoints for guaranteeing app integrity

## How KubeKata Rorks
**WIP!**

3 main components comprise the architecture of kubekata:
1. A server-side rendered frontend written in SvelteKit. Using a SSR allows for easy access to the internal components of kubernetes, as the server side application is deployed server side and svelte's api routing makes it simple to use the CoreDNS entries from the frontend-code itself. 
2. The kubernetes controller: At the current state it is likely the simplest controller ever written, but a controller nonetheless according to the [kubernetes docs](https://kubernetes.io/docs/concepts/architecture/controller/) `Kubernetes, controllers are control loops that watch the state of your cluster, then make or request changes where needed`. It is what observes the cluster states, evaluates the difference between the cluster state and the desired state of the current level, handles level success criteria, and does all other cluster management related tasks of Kubekata  
3. Curlpod: In small clusters where resources are limited and there are not enough resources and time to the deploy detailed observability tools such as the Cillium CNI with hubble, service meshed, and distributed tracing tools, a simple curlpod with curl and nslookup can provide enough insight to do basic debugging of a cluster. The Curlpod is queried through the intra cluster shell of the level page of the frontend. The curlpod is just a white-listed reverse shell through HTTP with an endpoint for each command. 


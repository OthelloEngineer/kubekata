#!/bin/sh

# Ensures current folder is NOT the ci folder.
CURRENT_FOLDER=$(basename "$PWD")

if [ "$CURRENT_FOLDER" = "ci" ]; then
    cd ..
fi

CHECK_IF_MINIKUBE_IS_CURRENT_CONTEXT=$(kubectl config view | grep "current-context: minikube" | wc -l)

if [ "$CHECK_IF_MINIKUBE_IS_CURRENT_CONTEXT" -lt 1 ]; then
    if kubectl config get-contexts | grep -q "minikube"; then
        echo "Switching to minikube context."
        kubectl config use-context minikube
    else
        echo "Context minikube does not exist. Attempting to start minikube."
        minikube start

        if kubectl config get-contexts | grep -q "minikube"; then
            echo "Switching to minikube context."
            kubectl config use-context minikube
        else
            echo "Failed to start minikube."
            exit 1
        fi
    fi
fi

CHECK_IF_CLUSTER_ROLE_BINDING_EXISTS=$(kubectl get clusterrolebinding | grep -c "default-view")

if [ "$CHECK_IF_CLUSTER_ROLE_BINDING_EXISTS" -lt 1 ]; then
    kubectl create clusterrolebinding default-view --clusterrole=view --serviceaccount=default:default
fi

echo "Setup finished."

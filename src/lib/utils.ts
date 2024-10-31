import { type Deployment, type Pod } from "./KubernetesTypes";

export function getDeploymentsFromClusterState(
  clusterState: any,
): Deployment[] {
  let deployments: Deployment[] = [];
  for (let deployment of clusterState.deployments) {
    let pods = getPodsFromDeploymentJSON(deployment);
    let deploymentObject: Deployment = {
      name: deployment.name,
      replicas: deployment.replicas,
      pods: pods,
      strategyType: deployment.strategyType,
      selector: deployment.selector,
      namespace: deployment.namespace,
    };
    deployments.push(deploymentObject);
  }
  return deployments;
}

export function getPodsFromDeploymentJSON(deployment: any): Pod[] {
  let pods: Pod[] = [];
  for (let pod of deployment.pods) {
    let podObject: Pod = {
      name: pod.name,
      containers: pod.containers,
      mounts: pod.mounts,
    };
    pods.push(podObject);
  }
  return pods;
}

export function printEnvs() {
  console.log("VITE_CLUSTER_OBSERVER_URL", import.meta.env.VITE_CLUSTER_OBSERVER_URL);
  console.log("VITE_CLUSTER_OBSERVER_PORT", import.meta.env.VITE_CLUSTER_OBSERVER_PORT);
  console.log("USE_CLUSTER", import.meta.env.VITE_USE_CLUSTER);
  console.log("CLUSTER_OBSERVER_URL", import.meta.env.VITE_CLUSTER_OBSERVER_URL);
  console.log("CLUSTER_OBSERVER_PORT", import.meta.env.VITE_CLUSTER_OBSERVER_PORT);
}


export function getClusterJson(){
  let clusterJson = {
    "deployments": [
      {
        "name": "nginx",
        "replicas": 2,
        "strategyType": "RollingUpdate",
        "selector": {
          "app": "nginx"
        },
        "namespace": "default",
        "pods": [
          {
            "name": "nginx-7db9fccd9d-8x7jw",
            "containers": [
              {
                "name": "nginx",
                "image": "nginx:1.19.3",
                "ports": [
                  {
                    "containerPort": 80
                  }
                ]
              }
            ],
            "mounts": []
          },
          {
            "name": "nginx-7db9fccd9d-8x7jw",
            "containers": [
              {
                "name": "nginx",
                "image": "nginx:1.19.3",
                "ports": [
                  {
                    "containerPort": 80
                  }
                ]
              }
            ],
            "mounts": []
          }
        ]
      }
    ],
    "services": [
      {
        "name": "nginx",
        "type": "ClusterIP",
        "selector": {
          "app": "nginx"
        },
        "ports": [
          {
            "port": 80,
            "targetPort": 80
          }
        ],
        "namespace": "default",
        "endpoints": [
          {
            "name": "nginx",
            "pod": 
              {
                "name": "nginx-7db9fccd9d-8x7jw",
                "namespace": "default"
              }
          }
        ]
      }
    ],
    "persistentVolumeClaims": [
      {
        "name": "nginx-pvc",
        "capacity": "1Gi",
        "accessMode": "ReadWriteOnce",
        "persistentVolume": {
          "name": "nginx-pv",
          "capacity": "1Gi",
          "accessMode": "ReadWriteOnce"
          }
      }
    ],
    "persistentVolumes": [
      {
        "name": "nginx-pv",
        "capacity": "1Gi",
        "accessMode": "ReadWriteOnce"
      }
    ]
  }
  return clusterJson;
}
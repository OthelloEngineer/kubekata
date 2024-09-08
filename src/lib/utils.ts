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

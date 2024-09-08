export interface Deployment {
  name: string;
  replicas: number;
  pods: Pod[];
  strategyType: string;
  selector: Map<string, string>;
  namespace: string;
}

export interface Pod {
  name: string;
  containers: Container[];
  mounts: PodVolume[];
}

export interface PodVolume {
  name: string;
  persistentVolumeClaimName: string;
}

export interface PersistentVolume {
  name: string;
  capacity: string;
  accessMode: string;
}

export interface Resource {
  cpu: string;
  memory: string;
}

export interface Container {
  name: string;
  ports: number[];
  image: string;
  requests: Resource;
  limits: Resource;
  envs: string[];
  mounts: string[];
}

export interface PersistentVolumeClaim {
  name: string;
  capacity: string;
  accessMod: string;
  persistentVolume: PersistentVolume;
}

export interface Service {
  name: string;
  ports: number[];
  selector: Map<string, string>;
  namespace: string;
  endpoints: EndPoint[];
}

export interface EndPoint {
  name: string;
  pods: Pod[];
  namespace: string;
}

export interface Cluster {
  deployments: Deployment[];
  services: Service[];
  persistentVolume: PersistentVolume[];
  persistentVolumeClaim: PersistentVolumeClaim[];
}

export function getDefaultCluster(): Cluster {
  return {
    deployments: [],
    services: [],
    persistentVolume: [],
    persistentVolumeClaim: [],
  };
}

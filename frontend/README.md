# KubeKata - Your level-based kuberentes onboarding

## How to use

### Step 1: Install npm packages
```sh
npm install
```

### Step 2: Run the project
```sh
./ci/start.sh
```


## When used in Kubernetes
Before you can use it in Kubernetes, you have to create `clusterrolebinding`. This can be done with the `setup.sh` shell script:
```sh
./ci/setup.sh
```

#!/bin/sh

# Ensures current folder is NOT the ci folder.
CURRENT_FOLDER=$(basename "$PWD")

if [ "$CURRENT_FOLDER" = "ci" ]; then
    cd ..
fi


manifest_file="kubernetes/deploys.yml"
dockerhub_username="NAME"  # Change this to your DockerHub username
image_name="kubekata-frontend"

current_version=$(grep -oP "(?<=image: $dockerhub_username/$image_name:)[a-zA-Z0-9._-]+" "$manifest_file")

if [ -z "$current_version" ]; then
  echo "Error: Current image version not found in $manifest_file."
  exit 1
fi

new_version=$(echo "$current_version" | awk -F. -v OFS=. '{$NF += 1; print}')

sed -i.bak -E "/image:\s+$dockerhub_username\/$image_name:/s|:[a-zA-Z0-9._-]+|:$new_version|g" "$manifest_file"

echo "Updated image version in $manifest_file from $current_version to $new_version"
echo "A backup of the original file is saved as $manifest_file.bak"

docker build -t "$dockerhub_username/$image_name:$new_version" .

docker push "$dockerhub_username/$image_name:$new_version"

echo "Finished building and pushing image $dockerhub_username/$image_name:$new_version"

kubectl apply -f "$manifest_file"

sleep 5
echo "Port forwarding to service. Press Ctrl+C to stop"
kubectl port-forward services/frontend 8080:5173

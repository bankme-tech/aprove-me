#!/bin/bash

TAG=$(node -p -e "require('./package.json').version")
GIT_TAG=$(git tag -l $TAG);

IMAGE=$( if [ $DOCKER_IMAGE ]; then echo $DOCKER_IMAGE; else echo "rntvicente/$GITHUB_REPOSITORY"; fi;);

if [ "$TAG" == "$GIT_TAG" ]; then
  echo "The version $TAG already exists!"
elif [[ ("$BRANCH_NAME" == "master" && "$TAG" != *"rc"*) || ("$BRANCH_NAME" != "master" && $TAG == *"rc"*) ]]; then
  git tag $TAG
  docker login -u $DOCKER_USER -p $DOCKER_PASSWORD

  echo "building image $IMAGE:$TAG"
  docker build -t $IMAGE:$TAG .

  echo "pushing image $IMAGE:$TAG"
  docker push $IMAGE:$TAG

  echo "Image $IMAGE:$TAG published on docker hub!"
  
  git push origin $TAG
  echo "$IMAGE:$TAG created on bitbucket!"
else
  echo "The version $TAG is unformated!"
  echo "Use MAJOR.MINOR.PATCH in master or MAJOR.MINOR.PATCH-rc-n in other branchs"
fi
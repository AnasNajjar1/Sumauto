test_merge_master_to_this_branch(){
  apk add git 
  git config --global user.email "gitlab@fake_mail.com"
  git config --global user.name "gitlab"
  git branch -a
  git fetch origin master
  git merge origin/master
}

npm_install_optimized(){
  npm set registry https://nx.aut.bz/repository/npm/ 
  npm install --prefer-offline --no-audit --progress=false
}

change_environment_variable_to(){
  local NEW_ENV=${1:?Error, I expected new environement}
  sed -i "s/REACT_APP_ENV=.*/REACT_APP_ENV=${NEW_ENV}/g" ./.env.production
}

npm_build_prod(){
  npm set registry https://nx.aut.bz/repository/npm/ 
  npm install --prefer-offline --no-audit --progress=false
  npm rebuild node-sass 
  CI=false npm run-script build:prod 
}

npm_build_staging(){
  npm set registry https://nx.aut.bz/repository/npm/ 
  npm install --prefer-offline --no-audit --progress=false
  npm rebuild node-sass 
  CI=false npm run-script build:staging 
}

assert_build_folder_exists(){
  [ -d ./build ] || ( echo "Build does not exists!" && exit 1 )
}

deploy_build_to_s3_bucket(){
  local S3_BUCKET_NAME=${1:?Error, I expected a bucket}
  pip3 install awscli 
  echo "deploy to ${S3_BUCKET_NAME}"
  aws s3 sync ./build s3://${S3_BUCKET_NAME} --delete
}

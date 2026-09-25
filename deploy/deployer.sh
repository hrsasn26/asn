#!/bin/sh
# Déploie une version de l'image sur un serveur, par SSH.
# Usage : sh deploy/deployer.sh <tag>
# Variables : DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH, DEPLOY_URL, DEPLOY_SSH_KEY, DEPLOY_KNOWN_HOSTS
set -eu

TAG="${1:?Indiquez le tag de l'image à déployer}"
: "${DEPLOY_HOST:?}" "${DEPLOY_USER:?}" "${DEPLOY_PATH:?}" "${DEPLOY_URL:?}"
: "${DEPLOY_SSH_KEY:?}" "${DEPLOY_KNOWN_HOSTS:?}"

mkdir -p ~/.ssh
chmod 700 ~/.ssh
printf '%s\n' "$DEPLOY_SSH_KEY" > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key
printf '%s\n' "$DEPLOY_KNOWN_HOSTS" > ~/.ssh/known_hosts

CIBLE="$DEPLOY_USER@$DEPLOY_HOST"
scp -i ~/.ssh/deploy_key deploy/compose.yaml deploy/Caddyfile "$CIBLE:$DEPLOY_PATH/"
ssh -i ~/.ssh/deploy_key "$CIBLE" \
  "cd '$DEPLOY_PATH' && export IMAGE_TAG='$TAG' && docker compose pull web && docker compose up -d --remove-orphans"

# Vérification après déploiement : le site doit répondre.
curl --fail --silent --show-error --retry 10 --retry-delay 3 --retry-all-errors \
  --output /dev/null "$DEPLOY_URL/robots.txt"
echo "Version $TAG déployée sur $DEPLOY_URL"

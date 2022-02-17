
mkdir ./src/environments
echo "export const environment = {
    production: '$1',
    PUBLIC_STRIPE_KEY: '$2',
    CHARGE_URL: '$3',
    API_URL: '$4'
};" > ./src/environments/environment.ts
cp ./src/environments/environment.ts ./src/environments/environment.prod.ts
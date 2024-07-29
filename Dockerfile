FROM node:alpine AS node-builder

WORKDIR /backend

COPY package*.json .
RUN npm install

COPY tsconfig.json .
COPY src/*.ts src/
COPY src/Utilities/*.ts src/Utilities/
COPY src/Modules/AuthModule/*.ts src/Modules/AuthModule/
COPY src/Modules/LeaderBoardModule/*.ts src/Modules/LeaderBoardModule/
COPY src/Modules/MatchModule/*.ts src/Modules/MatchModule/
COPY src/Modules/StateModule/*.ts src/Modules/StateModule/
RUN npx tsc

FROM registry.heroiclabs.com/heroiclabs/nakama:3.22.0

COPY --from=node-builder /backend/build/*.js /nakama/data/modules/build/
COPY local.yml /nakama/data/
#!/bin/bash

yarn migrate:up
node .output/server/index.mjs

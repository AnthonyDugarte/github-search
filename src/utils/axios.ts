import axios from "axios"
import * as AxiosLogger from "axios-logger"

const githubAPI = axios.create({
  baseURL: "https://api.github.com",
  responseType: "json",
  data: {},
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.mercy-preview+json",
  },
})

githubAPI.interceptors.request.use(AxiosLogger.requestLogger)
githubAPI.interceptors.response.use(AxiosLogger.responseLogger)

export { githubAPI }

import { $apiConfig } from './api-config'

import { createSafeCallFactory } from './create-safe-call-factory'

export const createSafeApiCall = createSafeCallFactory($apiConfig)

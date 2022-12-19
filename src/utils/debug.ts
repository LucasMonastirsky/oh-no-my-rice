//#region SETTINGS
const debug_console_whitelist: DebugLogTag[] = []
const debug_console_blacklist: DebugLogTag[] = []

const debug_log_enabled = true
const debug_warn_enabled = true
const debug_error_enabled = true
//#endregion

type DebugLogTag = 'touch'

const tagPassesFilters = (tag?: DebugLogTag) =>
  !tag || debug_console_whitelist.includes(tag) || !debug_console_blacklist.includes(tag)

export default {
  log: (message: any, tag?: DebugLogTag) => {
    if (debug_log_enabled && tagPassesFilters(tag)) {
      console.log(message)
    }
  },
  warn: (message: any, tag?: DebugLogTag) => {
    if (debug_warn_enabled && tagPassesFilters(tag)) {
      console.warn(message)
    }
  },
  error: (message: any, tag?: DebugLogTag) => {
    if (debug_error_enabled && tagPassesFilters(tag)) {
      console.error(message)
    }
  }
}

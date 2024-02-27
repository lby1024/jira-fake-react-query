export const resetRoute = () => (window.location.href = window.location.origin);

export const sleep = (time = 1000) => new Promise(reso => {

  const timer = setTimeout(() => {
    reso(true)
    clearTimeout(timer)
  }, time)
})
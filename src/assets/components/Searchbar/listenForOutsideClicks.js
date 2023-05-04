export default function listenForOutsideClicks(
    listening,
    setListening,
    menuRef,
    setIsAccordionVisible,
  ) {
    return () => {
      if (listening) return
      if (!menuRef.current) return
      setListening(true)
      ;[`click`, `touchstart`].forEach((type) => {
        document.addEventListener(`click`, (evt) => {
          const cur = menuRef.current
          const node = evt.target
          if (cur === null || cur.contains(node)) return
          setIsAccordionVisible(false)
        })
      })
    }
  }

//   export function removeListenForOutsideClicks(setListening){
//     return () => {
//     setListening(false)
//     ;[`click`, `touchstart`].forEach((type) => {
//     document.removeEventListener('click', (evt))
//     })
//     }
//   }
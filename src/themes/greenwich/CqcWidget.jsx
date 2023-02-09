import React, { useEffect } from "react"

const CqcWidget = ({ locationId }) => {
  useEffect(() => {
    const cqcSrc = `//www.cqc.org.uk/sites/all/modules/custom/cqc_widget/widget.js?data-id=${locationId}&data-host=www.cqc.org.uk&type=location`
    ;(function () {
      var sz = document.createElement("script")
      sz.type = "text/javascript"
      sz.async = true
      sz.src = cqcSrc
      var s = document.getElementById("cqcWidget")
      s.parentNode.insertBefore(sz, s)
    })()
  })

  return <div id="cqcWidget"></div>
}

export default CqcWidget

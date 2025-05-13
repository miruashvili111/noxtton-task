import { useMemo } from "react"

const useSizes = (size: number | undefined): string => {
    const formatSize = useMemo(() => {
        if(size === undefined || isNaN(size)) return 'Size not vaild!'

        const kb = size
        const mb = kb / 1024
        const gb = mb / 1024

        switch(true) {
            case mb >= 1:
                return `${mb.toFixed(2)} MB`
            case gb >= 1:
                return `${mb.toFixed(2)} MB`
            default:
                return `${kb.toFixed(0)} KB`
        }
    }, [size])

    return formatSize
}

export default useSizes
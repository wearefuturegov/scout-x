export const truncate = (str, noWords) => {
    if(str && (noWords > 1)){
        if(str.split(" ").length > noWords){
            return str.split(" ").splice(0,noWords).join(" ") + "..."
        } else {
            return str
        }
    }
}
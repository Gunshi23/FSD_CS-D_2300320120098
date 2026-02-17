function doSomething(){
    throw new Error("Something went wrong!");   
}

function init(){
    try{
        doSomething();  
    } catch (error) {
        console.error("Caught an error:", error.message);
    }
}

init();
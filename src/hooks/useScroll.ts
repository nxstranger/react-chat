const UseScroll = () => {

    const scrollBodyToBottom = (timeout: number) => {
        console.log('called scroll');
        setTimeout(
            () => scrollTo(0, document.body.scrollHeight),
            timeout
        );
    };
    return {
        scrollBodyToBottom,
    }
}

export default UseScroll;

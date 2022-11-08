const UseScroll = () => {

    const scrollBodyToBottom = (timeout: number) => {
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

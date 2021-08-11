/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { IconClipboardCheck, IconClipboardX, IconClipboard } from '@tabler/icons';

const Home = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copySuccessful, setCopySuccessful] = useState<undefined | boolean>(undefined);
    const [copyUnsuccessful, setCopyUnsuccessful] = useState<undefined | boolean>(undefined);

    function handleSuccessfulCopy() {
        setCopySuccessful(true);
        setCopyUnsuccessful(false);
    }

    function handleUnsuccessfulCopy() {
        setCopySuccessful(false);
        setCopyUnsuccessful(true);
    }

    function handleCopyClear() {
        setCopySuccessful(undefined);
        setCopyUnsuccessful(undefined);
    }

    const ClipboardIcon = () => {
        if (copySuccessful) return <IconClipboardCheck size={32} />;
        if (copyUnsuccessful) return <IconClipboardX size={32} />;
        return <IconClipboard size={32} />;
    };

    useEffect(() => {
        handleCopyClear();
    }, [input]);

    useEffect(() => {
        // eslint-disable-next-line max-len
        const result = input.replace(/transform="translate\([0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?\)"/g, (match) => `x={${Math.round(Number.parseFloat(match.split('transform="translate(')[1].split(' ')[0]))}} y={${Math.round(Number.parseFloat(match.split('transform="translate(')[1].split(' ')[1].split(')')[0]))}}`)
            .replace(/x="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `x={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/y="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `y={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/x1="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `x1={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/x2="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `x2={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/y1="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `y1={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/y2="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `y2={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/stroke-width="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `strokeWidth={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/width="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `width={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/height="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `height={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/font-size="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => `fontSize={${Math.round(Number.parseFloat(match.split('"')[1]))}}`)
            .replace(/font-family="[^"]*"/g, '');

        setOutput(result);
    }, [input]);

    return (
        <div className="flex flex-col w-full text-sm text-white bg-[#13171a] md:flex-row">
            <div className="flex flex-col py-10 px-4 space-y-10 w-full h-screen md:px-10 md:w-1/2">
                <textarea
                    // eslint-disable-next-line max-len
                    className="py-4 px-4 h-1/2 bg-[#232A2F] rounded-md border border-transparent focus:border-green-400 transition duration-300 focus:outline-none resize-none md:h-full scrollbar"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <div className="relative h-1/2 md:h-full">
                    <textarea
                        className="overflow-hidden py-4 px-4 w-full h-full bg-[#1A2023] rounded-md focus:outline-none resize-none scrollbar"
                        value={output}
                        readOnly
                    />
                    <div
                        // eslint-disable-next-line max-len
                        className={`w-14 h-14 flex opacity-90 text-white cursor-pointer items-center overflow-hidden justify-center mx-4 my-4 rounded-md absolute bottom-0 right-0 transtion duration-300 ${copySuccessful ? 'bg-green-400' : copyUnsuccessful ? 'bg-red-500' : 'bg-[#121618] hover:bg-[#0a0c0e]'}`}
                        onClick={() => navigator.clipboard.writeText(output).then(handleSuccessfulCopy).catch(handleUnsuccessfulCopy)}
                    >
                        <ClipboardIcon />
                    </div>
                </div>
            </div>
            <div className="py-10 px-4 w-full h-screen md:px-10 md:w-1/2">
                {output.includes('svg')
                    // eslint-disable-next-line react/no-danger
                    ? <div className="overflow-hidden w-full h-full bg-[#1A2023] rounded-md" dangerouslySetInnerHTML={{ __html: output }} />
                    : (
                        <div className="flex justify-center items-center w-full h-full text-3xl font-bold text-red-500 bg-[#1A2023]">
                            INSERT SVG
                        </div>
                    )}
            </div>
        </div>
    );
};
export default Home;

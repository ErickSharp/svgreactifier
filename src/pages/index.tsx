import React, { useEffect, useState } from "react";
import { IconClipboardCheck, IconClipboardX, IconClipboard } from "@tabler/icons";

const Home = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [previewSize, setPreviewSize] = useState(200);
    const [copySuccessful, setCopySuccessful] = useState<undefined | boolean>(undefined);
    const [copyUnsuccessful, setCopyUnsuccessful] = useState<undefined | boolean>(undefined);


    useEffect(() => {
        const result = input.replace(/transform="translate\([0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?\)"/g, (match) => {
            return `x={${Math.round(Number.parseFloat(match.split('transform="translate(')[1].split(' ')[0]))}} y={${Math.round(Number.parseFloat(match.split('transform="translate(')[1].split(' ')[1].split(')')[0]))}}`
        })
            .replace(/x="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `x={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/y="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `y={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/x1="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `x1={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/x2="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `x2={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/y1="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `y1={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/y2="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `y2={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/stroke-width="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `strokeWidth={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/width="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `width={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/height="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `height={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/font-size="[0-9]+[0-9\s]*(\.(\s*[0-9]){2,6})*(\.(\s*[0-9]){2,6})?"/g, (match) => {
                return `fontSize={${Math.round(Number.parseFloat(match.split('"')[1]))}}`
            })
            .replace(/font-family="[^"]*"/g, '');

        setOutput(result);
    }, [input]
    )

    return (
        <div className="bg-[#13171a] w-full text-white text-sm flex flex-col md:flex-row">
            <div className="h-screen px-10 py-10 space-y-10 flex flex-col w-full md:w-1/2">
                <textarea
                    className="bg-[#232A2F] resize-none h-full rounded-md px-4 py-4 focus:outline-none border border-transparent focus:border-blue-500 transition duration-300"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                />
                <div className="h-full relative">
                    <textarea
                        className="bg-[#1A2023] w-full h-full rounded-md resize-none px-4 py-4 focus:outline-none"
                        value={output}
                        readOnly
                    />
                    <div
                        className={`w-14 h-14 flex text-white items-center justify-center cursor-pointer mx-4 my-4 rounded-md absolute bottom-0 right-0 transtion duration-300 ${copySuccessful ? 'bg-green-400' : copyUnsuccessful ? 'bg-red-500' : 'bg-[#121618] hover:bg-[#0a0c0e]'}`}
                        onClick={() => navigator.clipboard.writeText(output).then(() => { setCopySuccessful(true); setCopyUnsuccessful(false) }).catch(() => { setCopyUnsuccessful(true); setCopySuccessful(false); })}
                    >
                        {copySuccessful ?
                            <IconClipboardCheck size={32} /> :
                            copyUnsuccessful ?
                                <IconClipboardX size={32} /> :
                                <IconClipboard size={32} />
                        }
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-screen px-10 py-10">
                {output.includes('svg') ?
                    <div className="w-full h-full bg-[#1A2023]" dangerouslySetInnerHTML={{ __html: output }} />
                    :
                    <div className="w-full h-full bg-[#1A2023] text-3xl font-bold flex items-center justify-center text-red-500">
                        INSERT SVG
                    </div>
                }
            </div>
        </div>
    );
}
export default Home;
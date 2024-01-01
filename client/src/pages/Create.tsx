import Navbar from "../components/Navbar"
import { useState } from "react";
import { preview } from "../assets";
import Loader from "../components/Loader";
import { useSnackbar } from "notistack";
import { surpriseOptions } from "../constants";
import Logo from "../components/Logo";
import { axios } from '../api/axios';

const Create = () => {
  const [img, setImg] = useState<any>([]);
  const [input, setInput] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const surpriseMe = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setInput(randomValue);
  }

  const validateInput = () => {
    if (input === '') {
      enqueueSnackbar('Please enter your prompt', { variant: 'error' });
      return false;
    } else if (amount < 1 || amount > 10) {
      enqueueSnackbar('Amount of picture must be between 1 and 10', { variant: 'error' });
      return false;
    } else if (name === '') {
      enqueueSnackbar('Name cannot be empty', { variant: 'error' });
      return false;
    }
    return true;
  };

  const generateImg = async () => {
    if (!validateInput()) {
      return;
    }
    try {
      setGeneratingImg(true);
      const res = await axios.post('/images', {
        prompt_user: input,
        amount
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = res.data;
      const imageArray = { data };
      setImg(imageArray);
      setGeneratingImg(false);
      enqueueSnackbar('Generate successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
      setGeneratingImg(false);
      enqueueSnackbar('Generate failed', { variant: 'error' });
    }
  };

  const share = async () => {
    if (!validateInput()) {
      return;
    }
    try {
      await axios.post('/share', {
        name,
        img,
        prompt_user: input,
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      enqueueSnackbar('Share successfully', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Share failed', { variant: 'error' });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="absolute left-0 top-0 md:left-[30px] md:top-[50px] xl:left-[80px]">
        <Logo />
      </div>
      <div className="p-4 flex flex-col mt-[100px] bg-[#f4f6fa]">
        <div className="px-2 lg:px-14 xl:px-24">
          <div className="my-5">
            <h1 className="font-extrabold text-[#333333] text-[32px]">Create</h1>
            <p className="mt-2 text-[#757575] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
          </div>
          <div>
            <input
              type="number"
              placeholder="How many pictures you want (1~10)"
              min="1"
              max="10"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full md:w-[80%] xl:w-1/2 p-3"
              onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            />
            <input
              type="text"
              placeholder="Exp: John"
              className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full md:w-[80%] xl:w-1/2 p-3"
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => surpriseMe()} className="mt-2 font-semibold w-[100px] text-xs hover:bg-[#e4e4f5] bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black">Surprise Me</button>
            <input
              type="text"
              value={input}
              placeholder="Prompt..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full md:w-[80%] xl:w-1/2 p-3"
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="mt-5">
              {img.length > 0 ? (
                <div className="flex flex-col md:flex-row mb-4">
                  {img?.map((e: any, index: any) => (
                    <div key={index} className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                      <img
                        src={e}
                        alt="Image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                  />
                  {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                      <Loader />
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              className="mt-4 mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => generateImg()}
            >
              Create
            </button>
            <div className="mt-10 md:mb-[100px]">
              <p className="mt-2 text-[#757575] text-[14px]">** Share it with others in the community !**</p>
              <button
                className="mt-4 px-4 py-2 w-[280px] bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => share()}
              >
                Share!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Create
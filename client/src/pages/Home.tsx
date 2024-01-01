import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import useGetImages from "../hooks/useGetImages";

const Home = () => {
    const [search, setSearch] = useState('');
    const { user, loading } = useGetImages();
    console.log(user);
    return (
        <div>
            <Navbar />
            <div className="absolute left-0 top-0 md:left-[30px] md:top-[50px] xl:left-[80px]">
                <Logo />
            </div>
            <div className="p-4 mt-[100px] bg-[#f4f6fa]">
                <div className="md:px-[112px] lg:px-[240px] xl:px-16 mt-[30px] h-[300px] md:h-[230px] xl:h-[200px] flex flex-col justify-between">
                    <div>
                        <h1 className="font-extrabold text-[#333333] text-[32px]">Global Ideas Exploration</h1>
                        <p className="mt-2 text-[#757575] text-[14px] max-w-[800px]">Peruse a collection of imaginative and aesthetically pleasing images produced by the DALL-E AI system</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900">Search posts</label>
                        <input
                            type="text"
                            placeholder="Search something ..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full md:w-[80%] xl:w-1/2 p-3"
                        />
                    </div>
                </div>
                {loading ? (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                        <Loader />
                    </div>
                ) : (
                    <div className="p-2">
                        <div className="mt-[30px] md:ml-[112px] lg:ml-[240px] xl:ml-16">
                            {search && (
                                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                    Showing Resuls: <span className="text-[#222328]">{search}</span>
                                </h2>
                            )}
                        </div>
                        <div className="flex justify-around flex-wrap">
                            {user?.filter((e: any) => {
                                return search.toLowerCase() === '' ? e : e.prompt_user.toLowerCase().includes(search)
                            })
                                ?.map((e: any) => (
                                    <Card key={e.id} e={e} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home

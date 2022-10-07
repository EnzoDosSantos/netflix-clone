import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Head from "next/head"
import Image from "next/image"
import Loading from "../components/Loading";

type Inputs = {
  email: string,
  password: string,
};

function Login() {
  const { signIn, signUp, loading, error } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
        await signIn(email, password)
    } else {
        await signUp(email, password)
    }
  }

  console.log(loading)

  
  const [login, setLogin] = useState(false)

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
        alt="Netflix Background"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        width={100}
        height={100}
        className="absolute left-4 top-4 md:left-10 md:top-6 cursor-pointer object-contain"
        alt="Netflix Logo"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="relavite mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:-max-w-md md:px-14 z-20">
        {
          !loading ? (
            <>
              <h1 className="text-4xl font-semibold">Sing In</h1>
              <div className="space-y-4">
                <label className="inline-block w-full">
                  <input {...register("email", { required: true })} className={`input ${errors.email && 'border-b-2 border-orange-500'}`} type="email" placeholder="Email" />
                  {errors.email && (
                    <p className="p-1 text-[13px] font-light  text-orange-500">
                      Please enter a valid email.
                    </p>
                  )}
                </label>
                <label className="inline-block w-full">
                  <input {...register("password", { required: true })} className={`input ${errors.password && 'border-b-2 border-orange-500'}`} type="password" placeholder="Password" />
                  {errors.password && (
                    <p className="p-1 text-[13px] font-light  text-orange-500">
                      Your password must contain between 4 and 60 characters.
                    </p>
                  )}
                </label>
              </div>
              <button onClick={() => setLogin(true)} className="w-full rounded bg-[#e50914] py-3 font-semibold">Sign In</button>
              <div className="text-[gray]">
                New to Netflix?{" "}
                <button onClick={() => setLogin(false)} type="submit" className="text-white hover:underline">Sign up now</button>
              </div>
            </>
          ) : (
            <Loading/>
          )
        }
      </form>
    </div>
  )
}

export default Login
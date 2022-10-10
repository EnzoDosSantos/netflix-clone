import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from "next/head"
import Link from "next/link"
import Loading from '../components/Loading'
import Membership from '../components/Membership'
import useAuth from "../hooks/useAuth"
import useSubscription from "../hooks/useSubscription"
import payments from '../lib/stripe'

interface Props {
    products: Product[]
}

function Account({ products }: Props) {
    console.log(products)
    const { user, logout } = useAuth()
    const { subscription, loading } = useSubscription(user)

    if (loading) return <Loading />

    const plan = products.find(product => product.id === subscription?.product)
    return (
        <div>
            <Head>
                <title>Account Settings - Netflix</title>
                <meta name="description" content="Netflix account page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={`bg-[#141414]`}>
                <Link href="/">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/logo.svg"
                        width={120}
                        height={120}
                        className="cursor-pointer object-contain"
                        alt="Netflix Logo"
                    />
                </Link>
                <Link href="/account">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/avatar.png"
                        alt="Avatar"
                        className="cursor-pointer rounded"
                    />
                </Link>
            </header>
            <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all">
                <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
                    <h1 className="text-3xl md:text-4xl">Account</h1>
                </div>
                <div className="-ml-0.5 flex items-center gap-x-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="h-7 w-7" src="/membersince.svg" alt="member-img" />
                    <p className="text-xs font-semibold text-[#555]">Member since {subscription?.created}</p>
                </div>

                <Membership/>
                <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
                    <h4>Plan Details</h4>
                    <div>{plan?.name}</div>
                    <p className="cursor-pointer text-blue-500 hover:underline md:text-right">Change plan</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
                    <h4 className="text-lg text-[gray]">Settings</h4>
                    <p
                        className="col-span-3 cursor-pointer text-blue-500 hover:underline"
                        onClick={logout}
                    >
                        Sign out of all devices
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Account


export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    })
        .then((res) => res)
        .catch((error) => console.log(error.message))

    return {
        props: {
            products,
        },
    }
}
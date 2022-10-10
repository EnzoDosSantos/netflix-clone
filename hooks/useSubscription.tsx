import { useEffect, useState } from 'react'
import { onCurrentUserSubscriptionUpdate, Subscription } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import { User } from 'firebase/auth'

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(subscription =>subscription.status === 'active' ||subscription.status === 'trialing')[0]
      )
      setLoading(false)
    })
  }, [user])

  return { subscription, loading }
}

export default useSubscription
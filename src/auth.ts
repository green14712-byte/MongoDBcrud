import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import connectMongoDB from './libs/mongodb'
import User from './models/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async signIn({ user, account }) {
      const apiUrl = process.env.API_URL
      const { name, email } = user

      if (account?.provider === 'google' || account?.provider === 'github') {
        try {
          await connectMongoDB()

          // DB에 사용자 존재 여부 확인
          const userExists = await User.findOne({ email })

          // 사용자 없음 → DB에 신규 생성 요청
          if (!userExists) {
            const res = await fetch(`${apiUrl}/api/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email }),
            })

            if (!res.ok) return false
          }

          // 로그인 로그 작성
          const res1 = await fetch(`${apiUrl}/api/log`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          })

          if (!res1.ok) return false

          return true
        } catch (error) {
          console.error(error)
          return false
        }
      }

      return true
    },
  },
})

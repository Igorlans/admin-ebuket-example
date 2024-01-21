/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
      prependData: `@import "styles/variables.scss"; @import "styles/mixins.scss";`
    },
    images: {
        domains: ['sqizuvuxpggdqvnjwnhs.supabase.co'],
    },
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
}

module.exports = nextConfig

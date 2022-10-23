import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import StoreContext from '../context/store-context'
import styles from '../styles/landing-page.module.css'
import store from '../styles/store.module.css'
import { createClient } from '../utils/client'
import { formatPrices } from '../utils/prices'

export default function Home ({ products }) {
  const { cart } = useContext(StoreContext)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Our Products</h1>
        <section id='storeSection' className={store.container}>
          <div className={store.products}>
            <div className={store.grid}>
              {products &&
                products.map(p => {
                  return (
                    <div key={p.id} className={store.card}>
                      <Link
                        href={{
                          pathname: `/product/[id]`,
                          query: { id: p.id }
                        }}
                        passHref
                      >
                        <a target='_blank'>
                          <h2 style={{ textAlign: 'center', color: '#0094dd' }}>
                            {p.title}
                          </h2>
                          <div className={styles.outercard}>
                            <div className={store.imgHolder}>
                              <Image
                                src={p.thumbnail}
                                alt='thumbnail'
                                width={250}
                                height={300}
                              ></Image>
                            </div>
                            <div style={{ paddingTop: '7%' }}>
                              <p style={{ color: 'grey', fontStyle: 'italic' }}>
                                {p.description}
                              </p>

                              <p
                                style={{
                                  color: '#0094dd',
                                  textAlign: 'right',
                                  fontWeight: 'bold'
                                }}
                              >
                                {formatPrices(cart, p.variants[0])}
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const client = createClient()
  const { products } = await client.products.list()

  return {
    props: {
      products
    }
  }
}

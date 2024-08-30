import React from 'react'
import Image from 'next/image'

export const SocialKB = () => {
  const styles = {
    inputContainer: {
      marginTop: 30,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#EDEDED40", /* Light grey background */
      bordeRadius: 5, /* Rounded orners */
      padding: "8px 8px" /* Padding around input */

    },
    inputContainer2: {
      marginTop: 10,
      display: "flex",
      backgroundColor: "#EDEDED40", /* Light grey background */
      bordeRadius: 5, /* Rounded orners */
      padding: "8px 8px" /* Padding around input */

    },
    input: {
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      flexGrow: 1,
      fontSize: '16px',
      paddingLeft: '10px',
      color: '#000', // Ensure text is black
    },
    box: {
      marginTop: 10,
      alignItems: "center",
      // backgroundColor: "#f5f5f5", /* Light grey background */
      bordeRadius: 20, /* Rounded orners */
      padding: "8px 8px" /* Padding around input */

    },
    image: {
      resize: "cover", objectFit: "contain"
    },
    button: {
      paddingTop: 8, paddingBottom: 8, paddingLeft: 8, paddingRight: 8, borderRadius: 5
    }
  }


  return (
    <div
      className='w-full flex flex-col p-15 pl-5 '
      style={{ height: '90vh', overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', marginTop: 20 }}
    >
      <div className='w-6/12 flex flex-col'>
        <div style={{ fontSize: 24, fontWeight: 300 }}>
          Social
        </div>

        <div>
          <div className='flex flex-row gap-5 mt-5 mb-5'>
            <Image style={styles.image}
              src={'/assets/fbIcon.png'} alt='facebook'
              height={30} width={30} />
            <button className='bg-grayBg w-full flex flex-row justify-between'
              style={styles.button}
            >
              <div >
                URL
              </div>
              <div className='text-purple'>
                Edit
              </div>

            </button>
          </div>

          <div className='flex flex-row gap-5 mb-5'>
            <Image style={styles.image}
              src={'/assets/youtubeIcon.png'} alt='Youtube'
              height={30} width={30} />
            <button className='bg-grayBg w-full flex flex-row justify-between'
              style={styles.button}
            >
              <div >
                URL
              </div>
              <div className='text-purple'>
                Edit
              </div>

            </button>
          </div>

          <div className='flex flex-row gap-5 mb-5'>
            <Image style={styles.image}
              src={'/assets/twitericon.png'} alt='Icon'
              height={30} width={30} />
            <button className='bg-grayBg w-full flex flex-row justify-between'
              style={styles.button}
            >
              <div >
                URL
              </div>
              <div className='text-purple'>
                Edit
              </div>

            </button>
          </div>

          <div className='flex flex-row gap-5 mb-5'>
            <Image style={styles.image}
              src={'/assets/appleProducts.png'} alt='appleProducts'
              height={30} width={30} />
            <button className='bg-grayBg w-full flex flex-row justify-between'
              style={styles.button}
            >
              <div >
                URL
              </div>
              <div className='text-purple'>
                Edit
              </div>

            </button>
          </div>

          <div className='flex flex-row gap-5 mb-5'>
            <Image style={styles.image}
              src={'/assets/spotify.png'} alt='spotifyIcon'
              height={30} width={30} />
            <button className='bg-grayBg w-full flex flex-row justify-between'
              style={styles.button}
            >
              <div >
                URL
              </div>
              <div className='text-purple'>
                Edit
              </div>

            </button>
          </div>

          <div className='flex flex-row gap-5 mb-5'>
            <Image style={styles.image}
              src={'/assets/instagram.png'} alt='insta'
              height={30} width={30} />
            <button className='bg-grayBg w-full flex flex-row justify-between'
              style={styles.button}
            >
              <div >
                URL
              </div>
              <div className='text-purple'>
                Edit
              </div>

            </button>
          </div>
        </div>

        <div style={{ fontSize: 24, fontWeight: 300, marginTop: 20 }}>
          Knowledge Base
        </div>

        <div className='w-full flex flex-col '>
          <div style={{ fontSize: 12, fontWeight: 300, color: '#00000060', marginTop: 20 }}>
            Sell a Product
          </div>

          <div className='w-full bg-grayBg flex  flex-row items-start mt-2 rounded'
            style={styles.inputContainer2}>
            <textarea
              className="w-6/12"
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                flexGrow: 1, resize: 'none',
                fontSize: '14px',
                paddingLeft: '10px',
                color: '#000',
              }}
              placeholder="Lorem ipsum dolor sit amet consectetur. Volutpat sit condimentum purus lorem. Praesent odio morbi sit sem risus habitant vitae. Neque aliquam risus gravida vivamus non. Suscipit ut sed elementum ullamcorper varius integer. Sit penatibus posuere."
              rows={8} // Adjust the number of rows to set the height of the textarea
              multiple
            />
            <button className='w-2/12 self-start'
            // onClick={}
            >
              <div className='text-purple'>
                Edit
              </div>
            </button>
          </div>

          <div className='w-full flex flex-col mt-5 gap-5'>
            <div className='w-full flex flex-row justify-between'>
              <button>
                <div style={{ fontSize: 14, fontWeight: 400, textDecoration: 'underline' }}>
                  document.pdf
                </div>
              </button>
              <div className='flex flex-row gap-4'>
                <button className='text-purple'>
                  Edit
                </button>
                <button className='text-red-500'>
                  Delete
                </button>
              </div>
            </div>

            <div className='w-full flex flex-row justify-between'>
              <button>
                <div style={{ fontSize: 14, fontWeight: 400, textDecoration: 'underline' }}>
                  URL
                </div>
              </button>
              <div className='flex flex-row gap-4'>
                <button className='text-purple'>
                  Edit
                </button>
                <button className='text-red-500'>
                  Delete
                </button>
              </div>
            </div>


            <button className='text-purple underline self-start mb-5'>
              Add New
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

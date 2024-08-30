import React from 'react'

export const AiDetails = () => {
  const styles = {
    inputContainer: {
      marginTop: 30,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#EDEDED40", /* Light grey background */
      borderRadius: 5, /* Rounded corners */
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
    inputContainer2: {
      marginTop: 10,
      display: "flex",
      backgroundColor: "#EDEDED40", /* Light grey background */
      bordeRadius: 5, /* Rounded orners */
      padding: "8px 8px" /* Padding around input */

    },
  }

  return (
    <div
      className='w-full flex flex-col p-15 pl-5'
      style={{ height: '90vh', overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', marginTop: 20 }}
    >
      <div className='w-11/12 flex flex-col'>
        <div style={{ fontSize: 24, fontWeight: 300 }}>
          AI Persona
        </div>
        <div className='flex flex-row w-full gap-4'>
          <div className='w-6/12  '>
            <div className='w-full rounded bg-grayBg' style={styles.inputContainer}>
              <input className='w-8/12' style={styles.input}
                placeholder="Tate.ai"
              />
              <button className='w-2/12'
              // onClick={}
              >
                <div className='text-purple'>
                  Edit
                </div>
              </button>
            </div>

            <div className='flex flex-col gap-10'>
              <div>
                <div style={{ fontSize: 12, color: '#00000050', marginTop: 30 }}>
                  Objective
                </div>

                <div className='w-full flex  flex-row items-start mt-2 rounded' style={styles.inputContainer2}>
                  <textarea
                    className="w-8/12"
                    style={{
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      flexGrow: 1, resize: 'none',
                      fontSize: '16px',
                      paddingLeft: '10px',
                      color: '#000',
                    }}
                    placeholder="Empowering creators and users to harness the power of AI through our AI prompt marketplace. "
                    rows={3} // Adjust the number of rows to set the height of the textarea
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
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#00000050' }}>
                  Personality Trait
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="Traits here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#00000050', }}>
                  Philosophy and views
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="content goes here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#00000050' }}>
                  Frameworks & techniques
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="content goes here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className='w-6/12 '>
            <div className='w-full flex flex-col gap-10'>
              <div>
                <div style={{ fontSize: 12, color: '#00000050', }}>
                  Values & Beliefs
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="content goes here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>


              <div>
                <div style={{ fontSize: 12, color: '#00000050', }}>
                Interaction Examples
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="content goes here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#00000050', }}>
                  Key Quote
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="content goes here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#00000050', }}>
                  Call Instructions
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="content goes here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#00000050', }}>
                  Expression examples
                </div>

                <div className='w-full mt-2 bg-grayBg rounded' style={styles.inputContainer2}>
                  <input className='w-8/12' style={styles.input}
                    placeholder="content goes here..."
                  />
                  <button className='w-2/12'
                  // onClick={}
                  >
                    <div className='text-purple'>
                      Edit
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

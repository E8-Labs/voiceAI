import Image from 'next/image'
import React, { useState } from 'react'

export const AiDetails = () => {

  //code for showing and hiding the questions
  const [interactionQuestions, setInterractionQuestions] = useState([
    {
      id: 1,
      title: "Question 1",
      details: "Hello it is queston 1 how are you?"
    },
    {
      id: 2,
      title: "Question 2",
      details: "Hello it is queston 2 what is your name?"
    },
    {
      id: 3,
      title: "Question 3",
      details: "Hello it is queston 3 where are you from?"
    },
  ])
  const [interactionQuestionsDetails, setInteractionQuestionsDetails] = useState(null);

  const handleInterRactionQuestionDetails = (id) => {
    setInteractionQuestionsDetails(interactionQuestionsDetails === id ? null : id);
  }

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
      backgroundColor: '#EDEDED60',
      flexGrow: 1,
      fontSize: '16px',
      paddingLeft: '10px',
      color: '#000', // Ensure text is black
      padding: 10
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
      {/*<div className='w-11/12 flex flex-col'>
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
                  </div>*/}

      <div className='w-full'>
        <div className='w-full flex flex-row items-start gap-4'>
          <div className=' w-5/12 rounded-xl px-6 pb-4' style={{ backgroundColor: '#ffffff50', }}>
            <div className='mt-8'
              style={{ fontSize: 15, fontWeight: '500', fontFamily: 'inter' }}>
              Values & Beliefs
            </div>
            <div className='mt-4'>
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
            </div>
            <button className='mt-4 text-purple'
              style={{ fontSize: 15, fontWeight: '400', fontFamily: 'inter' }}>
              Read More
            </button>
            {/* Code for the Voice user added */}

            <div className='mt-8'
              style={{ fontSize: 15, fontWeight: '500', fontFamily: 'inter' }}>
              My Voice
            </div>

            <div className='w-full flex flex-row gap-4 mt-2 items-center'>
              <div>
                <Image src='/assets/playIcon.png' alt='ply' height={32} width={32} />
              </div>
              <div className='w-11/12 flex flex-row justify-between'>
                <div>
                  Audio name
                </div>
                <div>
                  <button className='text-purple' style={{ fontSize: 13, fontWeight: '500', fontFamily: 'inter' }}>
                    Change
                  </button>
                </div>
              </div>
            </div>

          </div>
          {/*<div className='w-5/12 rounded-xl' style={{ backgroundColor: '#ffffff', }}>
            Box 2
                </div>*/}
          <div className='w-4/12 flex flex-col items-end'>
            <div className='w-11/12 bg-white p-5 flex flex-col gap-10 items-center shadow  rounded-xl'>
              <div style={{ fontSize: 20, fontWeight: "700", fontFamily: 'inter' }}>
                Test Your AI
              </div>

              <input
                className='w-full'
                style={styles.input}
                placeholder="Name"
              />

              <input
                className='w-full'
                style={styles.input}
                placeholder="Phone Number"
              />

              <button className='w-full py-3' style={{
                backgroundColor: '#552AFF', borderRadius: 5, color: 'white', marginTop: 25, borderRadius: "50px"
              }}
              // onClick={handleContinue}
              >
                Test AI
              </button>

            </div>
          </div>
        </div>

        <div className='w-full flex flex-row mt-4 mb-6 gap-6'>
          <div className='px-6 rounded-xl w-5/12 pb-4' style={{ backgroundColor: '#ffffff50', }}>
            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '500' }}>
              Personality Trait
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Agressive
            </div>
            <div className='mt-2'>
              Progressbar
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Polite
            </div>
            <div className='mt-2'>
              Progressbar
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Positive
            </div>
            <div className='mt-2'>
              Progressbar
            </div>

            <div className='mt-3' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13 }}>
              Humor
            </div>
            <div className='mt-2'>
              Progressbar
            </div>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '500' }}>
              Call Instruction
            </div>

            <div className='mt-2' style={{ fontWeight: '500', fontSize: 13, fontFamily: 'inter' }}>
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
            </div>

            <button className='mt-4 text-purple' style={{ fontWeight: '500', fontFamily: 'inter' }}>
              Read More
            </button>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '500' }}>
              Interaction examples
            </div>

            {
              interactionQuestions.map((item) => (
                <div key={item.id}>
                  <div className='w-full flex flex-row items-center justify-between mt-4'>
                    <div style={{ fontFamily: 'inter', fontSize: 13, fontWeight: '500' }}>
                      {item.title}
                    </div>
                    <button onClick={() => handleInterRactionQuestionDetails(item.id)}>
                      {
                        interactionQuestionsDetails === item.id ?
                          'less' :
                          'more'
                      }
                      {/*<Image alt='up' height={} width={} />*/}
                    </button>
                  </div>
                  {interactionQuestionsDetails === item.id &&
                    <div>
                      {item.details}
                    </div>
                  }
                </div>
              ))
            }

            <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
              Add More
            </button>

          </div>
          <div className='px-6 rounded-xl w-5/12 pb-4' style={{ backgroundColor: '#ffffff50', }}>
            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '500' }}>
              Framework & Techniques
            </div>


            {
              interactionQuestions.map((item) => (
                <div key={item.id}>
                  <div className='w-full flex flex-row items-center justify-between mt-4'>
                    <div style={{ fontFamily: 'inter', fontSize: 13, fontWeight: '500' }}>
                      {item.title}
                    </div>
                    <button onClick={() => handleInterRactionQuestionDetails(item.id)}>
                      {
                        interactionQuestionsDetails === item.id ?
                          'less' :
                          'more'
                      }
                      {/*<Image alt='up' height={} width={} />*/}
                    </button>
                  </div>
                  {interactionQuestionsDetails === item.id &&
                    <div>
                      {item.details}
                    </div>
                  }
                </div>
              ))
            }

            <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
              Add More
            </button>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '500' }}>
              Expression examples
            </div>

            <div>
              <input
                className='w-full bg-transparent px-2 py-2 mt-4 outline-none border-none'
                placeholder='First expression here'
                style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13, borderBottom: '2px solid #00000011', }} />
              <input
                className='w-full bg-transparent px-2 py-2 mt-4 outline-none border-none'
                placeholder='Second expression here'
                style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 13, borderBottom: '2px solid #00000011', }} />
              <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
                Add More
              </button>
            </div>

            <div className='mt-6' style={{ fontFamily: 'inter', fontSize: 15, fontWeight: '500' }}>
              Key Quotes
            </div>

            <div className='mt-4' style={{ fontFamily: 'inter', fontSize: 13, fontWeight: '400' }}>
              Lorem ipsum dolor sit amet consectetur. Amet quis interdum ipsum non eu aliquam aliquet consequat et. Tincidunt pharetra quam ac viverra. Sit pellentesque faucibus non sit. Feugiat consequat ultrices erat est. Nulla.
            </div>

            <button className='mt-4 text-purple' style={{ fontWeight: '400', fontFamily: 'inter', fontSize: 15 }}>
              Add More
            </button>

          </div>
        </div>

      </div>
    </div>

  )
}

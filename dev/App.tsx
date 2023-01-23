import { Component, createEffect, createSignal, JSX } from 'solid-js'
import {
  MaterialPikcer,
  HuePikcer,
  ColorResult,
  HslColor,
  AlphaPicker,
  TwitterPikcer,
  BlockPicker,
  SliderPikcer,
  GithubPicker,
  CompactPicker,
  SwatchesPikcer,
  CirclePicker,
  GooglePicker,
  ChromePicker,
  SketchPikcer,
  PhotoshopPicker,
} from '../src'

const App: Component = () => {
  const [color, setColor] = createSignal<HslColor>({
    h: 150,
    s: 0.5,
    l: 0.2,
    a: 1,
  })

  const [styles, setStyles] = createSignal<Record<string, JSX.CSSProperties>>({})

  createEffect(() => {
    setStyles({
      home: {
        'font-family': 'Roboto',
      },
      graphic: {
        height: '580px',
        position: 'relative',
      },
      cover: {
        position: 'absolute',
        inset: '0px',
        background: `hsl(${color().h}, ${color().s * 100}%, ${color().l * 100}%)`,
        transition: '100ms linear background-color',
        opacity: 0.5,
      },
      container: {
        'max-width': '780px',
        padding: '0 20px',
        margin: '0 auto',
      },
      title: {
        'padding-top': '70px',
        'font-size': '52px',
        color: 'rgba(0, 0, 0, 0.65)',
      },
      subtitle: {
        'font-size': '20px',
        'line-height': '27px',
        color: 'rgba(0, 0, 0, 0.4)',
        'padding-top': '15px',
        'font-weight': 300,
        'max-width': '320px',
      },
      star: {
        'padding-top': '25px',
        'padding-bottom': '20px',
      },
      chrome: {
        'padding-top': '50px',
        position: 'relative',
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'all 400ms cubic-bezier(0.55, 0, 0.1, 1) 0s',
      },
      whiteLabel: {
        'text-align': 'center',
        position: 'absolute',
        width: '100%',
        'font-size': '12px',
        'margin-top': '10px',
        color: 'rgba(255, 255, 255, .7)',
      },
    })
  })

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hsl)
  }

  return (
    <div style={styles().home}>
      <style>{`
          html, body {
            background: #eee;
            overflow-x: hidden;
          }
          .flexbox-fix {
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
          }
        `}</style>
      <div style={styles().graphic}>
        <div style={styles().cover} />
        <div style={styles().container}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', width: 'auto', 'padding-right': '260px' }}>
              <div>
                <div style={styles().title}>Solid Color</div>
                <div style={styles().subtitle}>
                  A Collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter,
                  Material Design & more
                </div>
              </div>
              <div style={styles().star}>
                <iframe
                  src="https://ghbtns.com/github-btn.html?user=xbmlz&repo=solid-color&type=star&count=true&size=large"
                  width="160px"
                  height="30px"
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            </div>
            <div style={{ position: 'absolute', right: '0px', top: '0px', width: '225px' }}>
              <div style={{ 'padding-top': '50px', position: 'relative' }}>
                <div style={styles().chrome}>
                  <ChromePicker color={color()} onChangeComplete={handleChangeComplete} />
                  <div style={styles().whiteLabel}>Chrome</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <MaterialPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <HuePikcer color={color()} onChangeComplete={handleChangeComplete} />
      <AlphaPicker color={color()} onChangeComplete={handleChangeComplete} />
      <TwitterPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <BlockPicker color={color()} onChangeComplete={handleChangeComplete} />
      <SliderPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <GithubPicker color={color()} onChangeComplete={handleChangeComplete} />
      <CompactPicker color={color()} onChangeComplete={handleChangeComplete} />
      <SwatchesPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <CirclePicker color={color()} onChangeComplete={handleChangeComplete} />
      <GooglePicker color={color()} onChangeComplete={handleChangeComplete} />
      <ChromePicker color={color()} onChangeComplete={handleChangeComplete} />
      <SketchPikcer color={color()} onChangeComplete={handleChangeComplete} />
      <PhotoshopPicker color={color()} onChangeComplete={handleChangeComplete} /> */}
    </div>
  )
}

export default App

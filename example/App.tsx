import { Component, createMemo, createSignal } from 'solid-js'
import {
  MaterialPicker,
  HuePicker,
  ColorResult,
  AlphaPicker,
  TwitterPicker,
  BlockPicker,
  SliderPicker,
  GithubPicker,
  CompactPicker,
  SwatchesPicker,
  CirclePicker,
  GooglePicker,
  ChromePicker,
  SketchPicker,
  PhotoshopPicker,
  RgbColor,
} from '../src'

import styles from './App.module.css'

const App: Component = () => {
  const [color, setColor] = createSignal<RgbColor>({
    r: 68,
    g: 107,
    b: 158,
    a: 1,
  })

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.rgb)
  }

  const coverStyle = createMemo(() => {
    return {
      'background-color': `rgba(${color().r}, ${color().g}, ${color().b}, ${color().a})`,
    }
  })

  return (
    <div class={styles.demo}>
      <div class={styles.cover} style={coverStyle()}>
        <div class={styles.container}>
          <div class={styles.title}>Solid Color</div>
          <div class={styles.description}>
            A Collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter, Material
            Design & more
          </div>
          <iframe
            class={styles.link}
            src="https://ghbtns.com/github-btn.html?user=xbmlz&amp;repo=solid-color&amp;type=star&amp;count=true&amp;size=large"
            width="160px"
            height="30px"
          ></iframe>
          <div class={styles.chrome}>
            <ChromePicker color={color()} onChangeComplete={handleChangeComplete} />
            <div class={styles.chromeTitle}>Chrome</div>
          </div>
          <div class={styles.components}>
            <div style={{ 'margin-top': '60px' }}>
              <div class={styles.sketch}>
                <SketchPicker color={color()} onChangeComplete={handleChangeComplete} />
                <div class={styles.customTitle}>Sketch</div>
              </div>
              <div class={styles.photoshop}>
                <PhotoshopPicker color={color()} onChangeComplete={handleChangeComplete} />
                <div class={styles.customTitle}>Photoshop</div>
              </div>
            </div>
            <div style={{ 'margin-top': '60px' }}>
              <div class={styles.block}>
                <BlockPicker color={color()} onChangeComplete={handleChangeComplete} />
                <div class={styles.customTitle}>Block</div>
              </div>
              <div>
                <div style={{ 'padding-left': '210px' }}>
                  <div class={styles.github}>
                    <GithubPicker color={color()} onChangeComplete={handleChangeComplete} />
                    <div class={styles.customTitle}>Github</div>
                  </div>
                  <div>
                    <div class={styles.hue}>
                      <HuePicker color={color()} onChangeComplete={handleChangeComplete} />
                      <div class={styles.customTitle}>Hue</div>
                    </div>
                    <div class={styles.alpha}>
                      <AlphaPicker color={color()} onChangeComplete={handleChangeComplete} />
                      <div class={styles.customTitle}>Alpha</div>
                    </div>
                  </div>
                  <div style="clear: both;"></div>
                  <div>
                    <div class={styles.twitter}>
                      <TwitterPicker color={color()} onChangeComplete={handleChangeComplete} />
                      <div class={styles.customTitle}>Twitter</div>
                    </div>
                    <div class={styles.circle}>
                      <CirclePicker color={color()} onChangeComplete={handleChangeComplete} />
                      <div class={styles.customTitle}>Circle</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ 'margin-top': '200px' }}>
              <div style={{ width: '410px', position: 'absolute', height: '100%' }}>
                <div class={styles.slider}>
                  <SliderPicker color={color()} onChangeComplete={handleChangeComplete} />
                  <div class={styles.customTitle}>Slider</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div class={styles.compact}>
                    <CompactPicker color={color()} onChangeComplete={handleChangeComplete} />
                    <div class={styles.customTitle}>Compact</div>
                  </div>
                  <div class={styles.material}>
                    <MaterialPicker color={color()} onChangeComplete={handleChangeComplete} />
                    <div class={styles.customTitle}>Material</div>
                  </div>
                </div>
              </div>
              <div>
                <div class={styles.swatches}>
                  <SwatchesPicker color={color()} onChangeComplete={handleChangeComplete} />
                  <div class={styles.customTitle}>Swatches</div>
                </div>
              </div>
            </div>
            <div style={{ 'margin-top': '80px' }}>
              <div style={{ width: '410px', position: 'absolute', height: '100%' }}>
                <div class={styles.google}>
                  <GooglePicker color={color()} onChangeComplete={handleChangeComplete} />
                  <div class={styles.customTitle}>Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

import Canvas from './Canvas'
import Welcome from './Welcome'
import Panel from '../../shared/Panel'

function Main() {
  return (
    <Panel
      height="h-[35em]"
      width="w-[40em]"
      bgColor="bg-[#121212]"
      additionalStyles={['text-sm', 'text-white', 'border', 'border-[#2b2b2b]']}
    >
      <Canvas />
      <Welcome />
    </Panel>
  )
}

export default Main

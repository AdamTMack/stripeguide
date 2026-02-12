import type { Branch } from '../../engine/types'
import ChoiceButton from './ChoiceButton'

interface ChoiceGroupProps {
  branches: Branch[]
  onChoose: (branch: Branch) => void
}

export default function ChoiceGroup({ branches, onChoose }: ChoiceGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      {branches.map((branch, i) => (
        <ChoiceButton
          key={branch.target}
          label={branch.label}
          emoji={branch.emoji}
          onClick={() => onChoose(branch)}
          index={i}
        />
      ))}
    </div>
  )
}

import React from 'react'
import styles from '../../../../styles_v2/components_v2/space/shelf/folder/AddFileModal.module.css';

export default function AddFileModal({onClose, showAddFileModal, setShowAddFileModal}) {
    if(!showAddFileModal) {
        <div
			onClick={createFile}
			className={styles.plusButton}
		>
			+
		</div>
    }
  return (
    <div>AddFileModal</div>
  )
}

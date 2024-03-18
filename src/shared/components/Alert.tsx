interface Props {
  msg: string
  description?: string
  actionFunc?: () => void
  actionTextButton?: string
}
const Alert = ({ msg, description, actionFunc, actionTextButton }: Props) => {
  return (
    <div className='rounded-md bg-cod-gray-600/30 p-2'>
      <div className='flex items-center'>
        <svg
          className='me-2 h-4 w-4 flex-shrink-0'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
        </svg>

        <span className='sr-only'>Info</span>
        <h3 className='text-lg font-medium'>{msg}</h3>
      </div>

      {description && <div className='mb-4 mt-2 text-sm'>{description}</div>}

      {actionFunc && actionTextButton && (
        <div className='flex justify-end'>
          <button className='border-carissma-800 hover:bg-carissma-600/20 rounded-md border p-2'>
            {actionTextButton}
          </button>
        </div>
      )}
    </div>
  )
}

export default Alert

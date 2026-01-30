import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-8 pt-6 md:pt-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl font-orbitron text-f1-white">
          {title}
        </h1>
        {description && (
          <p className="max-w-[700px] text-lg text-f1-steel">
            {description}
          </p>
        )}
        <div className="mt-4 h-1 w-20 bg-f1-red" />
      </div>
      
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </motion.div>
  )
}

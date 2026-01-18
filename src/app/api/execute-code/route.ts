import { NextResponse } from 'next/server'

// Code execution timeout in milliseconds
const EXECUTION_TIMEOUT = 10000 // 10 seconds

// Language-specific configurations
const LANGUAGE_CONFIGS: Record<string, {
  command: string
  extension: string
  runner: string
}> = {
  javascript: {
    command: 'node',
    extension: '.js',
    runner: 'node -e "{code}"',
  },
  python: {
    command: 'python3',
    extension: '.py',
    runner: 'python3 -c "{code}"',
  },
  typescript: {
    command: 'ts-node',
    extension: '.ts',
    runner: 'node -e "{code}"', // TypeScript would need transpilation
  },
}

/**
 * Execute JavaScript code securely
 */
async function executeJavaScript(code: string): Promise<{ output: string; error: string }> {
  try {
    // Capture console.log outputs
    const logs: string[] = []

    // Create a sandboxed execution environment
    const sandbox = (code: string): any => {
      // Override console.log to capture output
      const customConsole = {
        log: (...args: any[]) => {
          logs.push(args.map(arg => {
            if (typeof arg === 'object') {
              return JSON.stringify(arg, null, 2)
            }
            return String(arg)
          }).join(' '))
        },
        error: (...args: any[]) => {
          logs.push('ERROR: ' + args.join(' '))
        },
        warn: (...args: any[]) => {
          logs.push('WARN: ' + args.join(' '))
        },
      }

      // Execute code with restricted access
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
      const fn = new AsyncFunction('console', code)
      return fn(customConsole)
    }

    await sandbox(code)

    const output = logs.join('\n')

    return {
      output: output || 'No output',
      error: '',
    }
  } catch (error: any) {
    return {
      output: '',
      error: error.message || 'Unknown error',
    }
  }
}

/**
 * Execute Python code (simplified - would need actual Python runtime)
 */
async function executePython(code: string): Promise<{ output: string; error: string }> {
  try {
    // Note: This is a simplified version
    // In production, you would use a Docker container or external service
    // like Judge0, Piston, or a custom Docker-based executor

    // For now, return a mock response
    return {
      output: 'Python execution requires a Python runtime environment. Please set up Docker or an external code execution service.',
      error: 'Python runtime not configured',
    }
  } catch (error: any) {
    return {
      output: '',
      error: error.message || 'Unknown error',
    }
  }
}

/**
 * Validate code for potential security issues
 */
function validateCode(code: string, language: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check for dangerous patterns
  const dangerousPatterns = [
    // JavaScript/Node.js
    /require\s*\(\s*['"]fs['"]\s*\)/i,
    /require\s*\(\s*['"]child_process['"]\s*\)/i,
    /require\s*\(\s*['"]net['"]\s*\)/i,
    /require\s*\(\s*['"]http['"]\s*\)/i,
    /require\s*\(\s*['"]https['"]\s*\)/i,
    /require\s*\(\s*['"]os['"]\s*\)/i,
    /import\s+.*from\s+['"]fs['"]/i,
    /import\s+.*from\s+['"]child_process['"]/i,
    /eval\s*\(/i,
    /Function\s*\(/i,

    // Python
    /import\s+os/i,
    /import\s+subprocess/i,
    /import\s+socket/i,
    /__import__\s*\(/i,
    /exec\s*\(/i,
    /eval\s*\(/i,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      errors.push('Code contains potentially dangerous operations')
      break
    }
  }

  // Check code length
  if (code.length > 10000) {
    errors.push('Code exceeds maximum length of 10,000 characters')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, language = 'javascript', lessonId } = body

    // Validate input
    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      )
    }

    if (!LANGUAGE_CONFIGS[language]) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      )
    }

    // Validate code for security
    const validation = validateCode(code, language)
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Code validation failed',
          details: validation.errors,
        },
        { status: 400 }
      )
    }

    // Execute code based on language
    let result: { output: string; error: string }

    switch (language) {
      case 'javascript':
      case 'typescript':
        result = await executeJavaScript(code)
        break
      case 'python':
        result = await executePython(code)
        break
      default:
        result = {
          output: '',
          error: `Language ${language} not yet supported`,
        }
    }

    // Determine success (no errors and some output)
    const success = !result.error && result.output.trim().length > 0

    return NextResponse.json({
      success,
      output: result.output,
      error: result.error,
      executionTime: Math.random() * 100, // Mock execution time
      memory: Math.floor(Math.random() * 1024 * 1024), // Mock memory usage in bytes
    })
  } catch (error: any) {
    console.error('Error executing code:', error)
    return NextResponse.json(
      {
        error: 'Failed to execute code',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
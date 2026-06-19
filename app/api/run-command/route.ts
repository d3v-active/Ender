import { NextRequest, NextResponse } from 'next/server';

// Simple command parser that respects double quotes
function parseCommand(command: string): string[] {
  const regex = /"([^"]*)"|'([^']*)'|\S+/g;
  const args: string[] = [];
  let match;
  while ((match = regex.exec(command)) !== null) {
    args.push(match[1] ?? match[2] ?? match[0]);
  }
  return args;
}



// Get active sandbox from global state (in production, use a proper state management solution)
declare global {
  var activeSandbox: any;
}

export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();
    
    if (!command) {
      return NextResponse.json({ 
        success: false, 
        error: 'Command is required' 
      }, { status: 400 });
    }
    
    if (!global.activeSandbox) {
      return NextResponse.json({ 
        success: false, 
        error: 'No active sandbox' 
      }, { status: 400 });
    }
    
    console.log(`[run-command] Executing: ${command}`);
    
    // Parse command and arguments using robust shell parsing
const parts = parseCommand(command);
const cmd = parts[0];
const args = parts.slice(1);    
    // Execute command using Vercel Sandbox
    const result = await global.activeSandbox.runCommand({
      cmd,
      args
    });
    
    // Get output streams
    const stdout = await result.stdout();
    const stderr = await result.stderr();
    
    const output = [
      stdout ? `STDOUT:\n${stdout}` : '',
      stderr ? `\nSTDERR:\n${stderr}` : '',
      `\nExit code: ${result.exitCode}`
    ].filter(Boolean).join('');
    
    return NextResponse.json({
      success: true,
      output,
      exitCode: result.exitCode,
      message: result.exitCode === 0 ? 'Command executed successfully' : 'Command completed with non-zero exit code'
    });
    
  } catch (error) {
    console.error('[run-command] Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
import React, { useState, useEffect, useRef, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  LiveAnnouncer,
  LiveMessage,
  LiveMessenger,
  useAnnouncer,
} from '../../src/index';

const styles = {
  page: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f4f4f5',
    color: '#18181b',
    minHeight: '100vh',
    margin: 0,
    padding: '32px 20px',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '1040px',
    margin: '0 auto',
  },
  header: {
    backgroundColor: '#ffffff',
    border: '1px solid #e4e4e7',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '20px',
  },
  title: {
    margin: '0 0 6px',
    fontSize: '1.4rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#18181b',
    color: '#fafafa',
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '6px',
  },
  subtitle: {
    margin: 0,
    color: '#52525b',
    fontSize: '0.92rem',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e4e4e7',
    borderRadius: '12px',
    padding: '18px 20px',
  },
  cardTitle: {
    margin: '0 0 6px',
    fontSize: '1rem',
    fontWeight: 700,
  },
  cardDesc: {
    margin: '0 0 14px',
    fontSize: '0.85rem',
    color: '#52525b',
    lineHeight: 1.45,
  },
  btnGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  btn: {
    backgroundColor: '#18181b',
    color: '#ffffff',
    border: '1px solid #18181b',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '0.84rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnSecondary: {
    backgroundColor: '#ffffff',
    color: '#18181b',
    border: '1px solid #d4d4d8',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '0.84rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  inspectorCard: {
    backgroundColor: '#09090b',
    color: '#fafafa',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '20px 24px',
  },
  inspectorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
    gap: '10px',
    marginTop: '12px',
    marginBottom: '16px',
  },
  regionBox: {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '0.8rem',
  },
  regionBoxActive: {
    backgroundColor: '#18181b',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '0.8rem',
  },
  codeMeta: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '0.72rem',
    color: '#a1a1aa',
    marginBottom: '6px',
    display: 'block',
  },
  logList: {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '10px 14px',
    maxHeight: '160px',
    overflowY: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '0.78rem',
    color: '#d4d4d8',
  },
};

function HookExampleCard() {
  const { announcePolite, announceAssertive } = useAnnouncer();
  const [count, setCount] = useState(1);

  return (
    <section style={styles.card}>
      <h2 style={styles.cardTitle}>1. React Hook: useAnnouncer()</h2>
      <p style={styles.cardDesc}>
        Recommended for functional components (PR #25). Broadcasts messages directly without wrapper boilerplate.
      </p>
      <div style={styles.btnGroup}>
        <button
          type="button"
          style={styles.btn}
          onClick={() => {
            announcePolite(`Polite hook message #${count}`, `hook-p-${count}`);
            setCount(count + 1);
          }}
        >
          Announce Polite (Hook)
        </button>
        <button
          type="button"
          style={styles.btnSecondary}
          onClick={() => {
            announceAssertive(`Alert: action required #${count}`, `hook-a-${count}`);
            setCount(count + 1);
          }}
        >
          Announce Assertive (Hook)
        </button>
      </div>
    </section>
  );
}

function RouteMountToast({ routeName }) {
  return (
    <LiveMessage
      message={`Navigated to ${routeName} view`}
      aria-live="polite"
      clearOnUnmount={true}
    />
  );
}

function Demo() {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');
  const [simulatedRoute, setSimulatedRoute] = useState(null);
  const [liveSnapshot, setLiveSnapshot] = useState([
    { role: 'alert', live: 'assertive', text: '' },
    { role: 'alert', live: 'assertive', text: '' },
    { role: 'status', live: 'polite', text: '' },
    { role: 'status', live: 'polite', text: '' },
  ]);
  const [mutationLog, setMutationLog] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const rootEl = wrapperRef.current;
    if (!rootEl) return undefined;

    const readRegions = () => {
      const nodes = rootEl.querySelectorAll('[aria-live]');
      const snap = Array.from(nodes).map((n) => ({
        role: n.getAttribute('role'),
        live: n.getAttribute('aria-live'),
        atomic: n.getAttribute('aria-atomic'),
        relevant: n.getAttribute('aria-relevant'),
        text: n.textContent || '',
      }));
      if (snap.length === 4) {
        setLiveSnapshot(snap);
      }
      snap.forEach((s, idx) => {
        if (s.text) {
          const ts = new Date().toLocaleTimeString();
          setMutationLog((prev) => [
            `[${ts}] Block #${idx + 1} (role="${s.role}" aria-live="${s.live}" aria-atomic="${s.atomic}") -> "${s.text}"`,
            ...prev.slice(0, 14),
          ]);
        }
      });
    };

    readRegions();
    const observer = new MutationObserver(readRegions);
    observer.observe(rootEl, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, []);

  return (
    <StrictMode>
      <div style={styles.page} ref={wrapperRef}>
        <main style={styles.container}>
          <header style={styles.header}>
            <h1 style={styles.title}>
              <span>react-aria-live</span>
              <span style={styles.badge}>v3.0 · VoiceOver + NVDA + JAWS + TalkBack</span>
            </h1>
            <p style={styles.subtitle}>
              Interactive verification suite for screen readers. Turn on VoiceOver (Cmd + F5 on macOS) or NVDA/JAWS and test each pattern below while inspecting the live DOM buffers in real time.
            </p>
          </header>

          <LiveAnnouncer>
            <LiveMessage message={politeMessage} aria-live="polite" />
            <LiveMessage message={assertiveMessage} aria-live="assertive" />
            {simulatedRoute && <RouteMountToast key={simulatedRoute} routeName={simulatedRoute} />}

            <div style={styles.grid}>
              <HookExampleCard />

              <section style={styles.card}>
                <h2 style={styles.cardTitle}>2. Declarative &lt;LiveMessage /&gt;</h2>
                <p style={styles.cardDesc}>
                  Triggers announcements when the bound <code>message</code> prop changes or when a route component mounts (Issues #20, #37).
                </p>
                <div style={styles.btnGroup}>
                  <button
                    type="button"
                    style={styles.btn}
                    onClick={() =>
                      setPoliteMessage((prev) =>
                        prev === 'Polite status updated.'
                          ? 'Second polite status update.'
                          : 'Polite status updated.'
                      )
                    }
                  >
                    Toggle Polite Prop
                  </button>
                  <button
                    type="button"
                    style={styles.btnSecondary}
                    onClick={() =>
                      setAssertiveMessage((prev) =>
                        prev === 'Critical form validation error!'
                          ? 'Please review highlighted fields!'
                          : 'Critical form validation error!'
                      )
                    }
                  >
                    Toggle Assertive Prop
                  </button>
                  <button
                    type="button"
                    style={styles.btnSecondary}
                    onClick={() =>
                      setSimulatedRoute((prev) =>
                        prev === 'Dashboard' ? 'Settings' : 'Dashboard'
                      )
                    }
                  >
                    Simulate Route Mount ({simulatedRoute || 'None'})
                  </button>
                </div>
              </section>

              <section style={styles.card}>
                <h2 style={styles.cardTitle}>3. &lt;LiveMessenger /&gt; &amp; Rebroadcast</h2>
                <p style={styles.cardDesc}>
                  Render-prop API with unique IDs to rebroadcast the exact same text repeatedly in VoiceOver &amp; NVDA.
                </p>
                <LiveMessenger>
                  {({ announcePolite, announceAssertive }) => (
                    <div style={styles.btnGroup}>
                      <button
                        type="button"
                        style={styles.btn}
                        onClick={() =>
                          announcePolite(
                            'Repeated notification message',
                            `${Date.now()}-${Math.random()}`
                          )
                        }
                      >
                        Rebroadcast Same Message
                      </button>
                      <button
                        type="button"
                        style={styles.btnSecondary}
                        onClick={() =>
                          announceAssertive(
                            'Immediate assertive interruption',
                            `${Date.now()}-${Math.random()}`
                          )
                        }
                      >
                        Assertive via Messenger
                      </button>
                    </div>
                  )}
                </LiveMessenger>
              </section>
            </div>

            <section style={styles.inspectorCard} aria-label="Live Region DOM Inspector">
              <h2 style={{ margin: '0 0 4px', fontSize: '1rem' }}>
                Real-Time DOM Live Region Inspector (4 Double-Buffered Nodes)
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#a1a1aa' }}>
                Verifies that <code>role=&quot;alert|status&quot;</code>, <code>aria-atomic=&quot;true&quot;</code>, and <code>aria-relevant=&quot;additions text&quot;</code> alternate cleanly without an extra wrapper <code>&lt;div&gt;</code> (Issue #12).
              </p>

              <div style={styles.inspectorGrid}>
                {liveSnapshot.map((block, i) => (
                  <div
                    key={i}
                    style={block.text ? styles.regionBoxActive : styles.regionBox}
                  >
                    <span style={styles.codeMeta}>
                      Buffer #{i + 1} · role=&quot;{block.role}&quot; · aria-live=&quot;{block.live}&quot; · aria-atomic=&quot;{block.atomic || 'true'}&quot;
                    </span>
                    <strong style={{ color: block.text ? '#60a5fa' : '#52525b' }}>
                      {block.text ? `"${block.text}"` : '(empty)'}
                    </strong>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: '6px', color: '#a1a1aa' }}>
                AXLiveRegionChanged / DOM Mutation Log:
              </div>
              <div style={styles.logList}>
                {mutationLog.length === 0 ? (
                  <span>Click any button above to inspect live region mutations...</span>
                ) : (
                  mutationLog.map((entry, idx) => <div key={idx}>{entry}</div>)
                )}
              </div>
            </section>
          </LiveAnnouncer>
        </main>
      </div>
    </StrictMode>
  );
}

const demoEl = document.querySelector('#demo');
if (demoEl) {
  createRoot(demoEl).render(<Demo />);
}
